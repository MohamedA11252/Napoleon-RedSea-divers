import { useEffect, useState } from "react";

const PHONE = "201070222128";

export default function WhatsAppFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={`https://wa.me/${PHONE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-[#25D366] pl-4 pr-5 py-3 shadow-lg shadow-black/20 transition-all duration-500 hover:bg-[#1ebe5d] hover:shadow-xl hover:shadow-black/30 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0 pointer-events-none"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-7 w-7 fill-white"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-2.756 8.029a9.95 9.95 0 0 1-5.074-1.384l-.363-.214-3.769.988.998-3.673-.235-.376a9.94 9.94 0 0 1-1.527-5.295c0-5.49 4.482-9.972 9.973-9.972 2.664 0 5.167 1.039 7.054 2.926a9.9 9.9 0 0 1 2.918 7.05c0 5.49-4.482 9.97-9.972 9.97M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.104 11.941c0 2.103.55 4.157 1.595 5.97L0 24l6.305-1.654a11.9 11.9 0 0 0 5.74 1.46h.005c6.582 0 11.941-5.359 11.941-11.941 0-3.194-1.245-6.195-3.471-8.418" />
      </svg>
      <span className="text-sm font-medium text-white">Chat with us</span>
    </a>
  );
}
