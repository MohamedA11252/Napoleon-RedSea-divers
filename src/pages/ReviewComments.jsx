import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Check, X, Star, ArrowLeft } from "lucide-react";
import { getAllComments, updateCommentApproval } from "@/lib/guestComments";

export default function ReviewComments({ approved = false }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadComments = () => {
    try {
      const data = getAllComments();
      setComments(Array.isArray(data) ? data : []);
    } catch {
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  const handleApproval = (id, nextApproved) => {
    updateCommentApproval(id, nextApproved);
    loadComments();
  };

  const pending = comments.filter((c) => c.approved === false);
  const approvedComments = comments.filter((c) => c.approved !== false);

  return (
    <div className="bg-background min-h-screen">
      <div className="border-b border-primary/10">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-foreground/50 hover:text-primary transition-colors text-[12px] uppercase tracking-[0.15em] font-body"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <p className="text-[11px] uppercase tracking-[0.35em] text-primary font-body">
            Review Comments
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-16">
        <h1 className="font-display text-4xl text-foreground mb-4">Guestbook Moderation</h1>
        <p className="text-foreground/50 font-body text-sm mb-12">
          Approve or reject guest impressions before they appear on the public guestbook.
        </p>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-16">
            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">
                Pending Review ({pending.length})
              </h2>
              {pending.length === 0 ? (
                <p className="text-foreground/40 font-body text-sm">No comments awaiting review.</p>
              ) : (
                <div className="space-y-4">
                  {pending.map((comment) => (
                    <CommentCard
                      key={comment.id}
                      comment={comment}
                      approved={approved}
                      onApprove={() => handleApproval(comment.id, true)}
                      onReject={() => handleApproval(comment.id, false)}
                    />
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">
                Approved ({approvedComments.length})
              </h2>
              {approvedComments.length === 0 ? (
                <p className="text-foreground/40 font-body text-sm">No approved comments yet.</p>
              ) : (
                <div className="space-y-4">
                  {approvedComments.map((comment) => (
                    <CommentCard
                      key={comment.id}
                      comment={comment}
                      approved={true}
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

function CommentCard({ comment, approved = false, onApprove, onReject }) {
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
            approved || comment.approved !== false
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

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onApprove}
          className="inline-flex items-center gap-2 border border-primary/30 text-primary px-4 py-2 text-[11px] uppercase tracking-[0.15em] font-body hover:bg-primary/10 transition-colors"
        >
          <Check size={14} />
          Approve
        </button>
        <button
          type="button"
          onClick={onReject}
          className="inline-flex items-center gap-2 border border-foreground/20 text-foreground/60 px-4 py-2 text-[11px] uppercase tracking-[0.15em] font-body hover:bg-foreground/5 transition-colors"
        >
          <X size={14} />
          Reject
        </button>
      </div>
    </div>
  );
}
