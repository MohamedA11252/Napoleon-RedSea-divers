import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Check, X, Star, ArrowLeft, LogOut, Clock, CheckCircle } from "lucide-react";
import { commentsApi } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";

export default function ReviewComments() {
  const { isAdmin, logout } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadComments = async () => {
    try {
      const data = await commentsApi.getAll();
      setComments(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to load comments.");
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  const handleApproval = async (id, approved) => {
    try {
      await commentsApi.setApproval(id, approved);
      await loadComments();
    } catch (err) {
      setError(err.message || "Failed to update comment.");
    }
  };

  const pending = comments.filter((c) => c.approved === false);
  const approvedComments = comments.filter((c) => c.approved === true);

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="border-b border-primary/10">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-foreground/50 hover:text-primary transition-colors text-[12px] uppercase tracking-[0.15em] font-body"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <div className="flex items-center gap-6">
            <p className="text-[11px] uppercase tracking-[0.35em] text-primary font-body hidden sm:block">
              Admin Panel
            </p>
            <button
              onClick={() => logout(true)}
              className="flex items-center gap-2 text-foreground/40 hover:text-primary transition-colors text-[12px] uppercase tracking-[0.15em] font-body"
            >
              <LogOut size={15} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-16">
        <h1 className="font-display text-4xl text-foreground mb-4">Guestbook Moderation</h1>
        <p className="text-foreground/50 font-body text-sm mb-12">
          Approve or reject guest impressions before they appear on the public guestbook.
        </p>

        {error && (
          <div className="mb-8 p-4 border border-destructive/30 bg-destructive/10 text-destructive text-sm font-body">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-16">
            {/* Pending */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Clock size={18} className="text-foreground/40" strokeWidth={1.5} />
                <h2 className="font-display text-2xl text-foreground">Pending Review</h2>
                <span className="text-[11px] uppercase tracking-[0.2em] text-foreground/40 font-body border border-foreground/15 px-2 py-0.5">
                  {pending.length}
                </span>
              </div>
              {pending.length === 0 ? (
                <p className="text-foreground/40 font-body text-sm">No comments awaiting review.</p>
              ) : (
                <div className="space-y-4">
                  {pending.map((comment) => (
                    <CommentCard
                      key={comment.id}
                      comment={comment}
                      isAdmin={isAdmin}
                      onApprove={() => handleApproval(comment.id, true)}
                      onReject={() => handleApproval(comment.id, false)}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Approved */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle size={18} className="text-primary/60" strokeWidth={1.5} />
                <h2 className="font-display text-2xl text-foreground">Approved</h2>
                <span className="text-[11px] uppercase tracking-[0.2em] text-primary font-body border border-primary/20 px-2 py-0.5">
                  {approvedComments.length}
                </span>
              </div>
              {approvedComments.length === 0 ? (
                <p className="text-foreground/40 font-body text-sm">No approved comments yet.</p>
              ) : (
                <div className="space-y-4">
                  {approvedComments.map((comment) => (
                    <CommentCard
                      key={comment.id}
                      comment={comment}
                      isApproved
                      isAdmin={isAdmin}
                      onApprove={() => handleApproval(comment.id, true)}
                      onReject={() => handleApproval(comment.id, false)}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

function CommentCard({ comment, isApproved = false, isAdmin, onApprove, onReject }) {
  return (
    <div className="border border-primary/10 bg-secondary/20 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <p className="text-primary font-body font-medium">{comment.name}</p>
          <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/30 font-body mt-1">
            {comment.created_date
              ? new Date(comment.created_date).toLocaleString()
              : "Unknown date"}
          </p>
        </div>
        <span
          className={`text-[10px] uppercase tracking-[0.15em] px-3 py-1 border ${
            comment.approved === true
              ? "border-primary/30 text-primary"
              : "border-foreground/20 text-foreground/50"
          }`}
        >
          {comment.approved === false ? "Pending" : "Approved"}
        </span>
      </div>

      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Star
            key={idx}
            size={14}
            className={idx < (comment.rating || 5) ? "text-primary fill-primary" : "text-foreground/10"}
            strokeWidth={1.5}
          />
        ))}
      </div>

      <p className="text-foreground/80 font-body text-sm leading-relaxed mb-6">
        {comment.comment}
      </p>

      {/* Admin-only controls — never rendered for regular visitors */}
      {isAdmin && (
        <div className="flex flex-wrap gap-3">
          {comment.approved === false ? (
            <button
              type="button"
              onClick={onApprove}
              className="inline-flex items-center gap-2 border border-primary/30 text-primary px-4 py-2 text-[11px] uppercase tracking-[0.15em] font-body hover:bg-primary/10 transition-colors"
            >
              <Check size={14} />
              Approve
            </button>
          ) : (
            <button
              type="button"
              onClick={onReject}
              className="inline-flex items-center gap-2 border border-foreground/20 text-foreground/60 px-4 py-2 text-[11px] uppercase tracking-[0.15em] font-body hover:bg-foreground/5 transition-colors"
            >
              <X size={14} />
              Revoke
            </button>
          )}
        </div>
      )}
    </div>
  );
}
