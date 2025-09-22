// import { useRef, useState } from "react";
// import emailjs from "@emailjs/browser";

// import TitleHeader from "../components/TitleHeader";
// import ContactExperience from "../components/models/contact/ContactExperience";

// const Contact = () => {
//   const formRef = useRef(null);
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Show loading state

//     try {
//       await emailjs.sendForm(
//         import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
//         import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
//         formRef.current,
//         import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
//       );

//       // Reset form and stop loading
//       setForm({ name: "", email: "", message: "" });
//     } catch (error) {
//       console.error("EmailJS Error:", error); // Optional: show toast
//     } finally {
//       setLoading(false); // Always stop loading, even on error
//     }
//   };

//   return (
//     <section id="contact" className="flex-center section-padding">
//       <div className="w-full h-full md:px-10 px-5">
//         <TitleHeader
//           title="Get in Touch – Let’s Connect"
//           sub="💬 Have questions or ideas? Let’s talk! 🚀"
//         />
//         <div className="grid-12-cols mt-16">
//           <div className="xl:col-span-5">
//             <div className="flex-center card-border rounded-xl p-10">
//               <form
//                 ref={formRef}
//                 onSubmit={handleSubmit}
//                 className="w-full flex flex-col gap-7"
//               >
//                 <div>
//                   <label htmlFor="name">Your name</label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={form.name}
//                     onChange={handleChange}
//                     placeholder="What’s your good name?"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="email">Your Email</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={form.email}
//                     onChange={handleChange}
//                     placeholder="What’s your email address?"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="message">Your Message</label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     value={form.message}
//                     onChange={handleChange}
//                     placeholder="How can I help you?"
//                     rows="5"
//                     required
//                   />
//                 </div>

//                 <button type="submit">
//                   <div className="cta-button group">
//                     <div className="bg-circle" />
//                     <p className="text">
//                       {loading ? "Sending..." : "Send Message"}
//                     </p>
//                     <div className="arrow-wrapper">
//                       <img src="/images/arrow-down.svg" alt="arrow" />
//                     </div>
//                   </div>
//                 </button>
//               </form>
//             </div>
//           </div>
//           <div className="xl:col-span-7 min-h-96">
//             <div className="bg-[#cd7c2e] w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
//               <ContactExperience />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import TitleHeader from "../components/TitleHeader";
import ContactExperience from "../components/models/contact/ContactExperience";

const initialForm = { name: "", email: "", message: "" };

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, msg: "" }); // {type: "success"|"error", msg: string}
  const [touched, setTouched] = useState({});

  // optional: super-light honeypot (bots will fill hidden field)
  const [botField, setBotField] = useState("");

  const setSuccess = (msg) => setStatus({ type: "success", msg });
  const setError = (msg) => setStatus({ type: "error", msg });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  };

  // basic validation
  const errors = (() => {
    const errs = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      errs.name = "Please enter your name (2+ characters).";
    }
    const email = form.email.trim();
    if (
      !email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email)
    ) {
      errs.email = "Please enter a valid email address.";
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      errs.message = "Please add a brief message (10+ characters).";
    }
    return errs;
  })();

  const firstErrorKey = Object.keys(errors)[0];
  const isInvalid = Boolean(firstErrorKey);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, msg: "" });

    // honeypot trip
    if (botField) return;

    // block if invalid & focus first invalid field
    if (isInvalid) {
      setTouched({ name: true, email: true, message: true });
      const field = formRef.current?.querySelector(`#${firstErrorKey}`);
      field?.focus();
      return;
    }

    setLoading(true);
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      setForm(initialForm);
      setTouched({});
      setSuccess("✅ Your message has been sent!");
    } catch (err) {
      console.error("EmailJS Error:", err);
      setError("❌ Something went wrong. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Get in Touch – Let’s Connect"
          sub="💬 Have questions or ideas? Let’s talk! 🚀"
        />

        <div className="grid-12-cols mt-16">
          {/* Form */}
          <div className="xl:col-span-5">
            <div className="flex-center card-border rounded-xl p-10">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
                noValidate
              >
                {/* honeypot (hidden) */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={botField}
                  onChange={(e) => setBotField(e.target.value)}
                  style={{ position: "absolute", left: "-9999px", opacity: 0, width: 0, height: 0 }}
                  aria-hidden="true"
                />

                <div>
                  <label htmlFor="name">Your name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="What’s your good name?"
                    required
                    aria-invalid={touched.name && !!errors.name}
                    aria-describedby={touched.name && errors.name ? "name-error" : undefined}
                  />
                  {touched.name && errors.name && (
                    <p id="name-error" className="text-red-400 mt-2 text-sm">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="What’s your email address?"
                    required
                    aria-invalid={touched.email && !!errors.email}
                    aria-describedby={touched.email && errors.email ? "email-error" : undefined}
                  />
                  {touched.email && errors.email && (
                    <p id="email-error" className="text-red-400 mt-2 text-sm">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    autoComplete="off"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="How can I help you?"
                    rows="5"
                    required
                    aria-invalid={touched.message && !!errors.message}
                    aria-describedby={touched.message && errors.message ? "message-error" : undefined}
                  />
                  {touched.message && errors.message && (
                    <p id="message-error" className="text-red-400 mt-2 text-sm">{errors.message}</p>
                  )}
                </div>

                {/* Submit */}
                <button type="submit" disabled={loading} aria-disabled={loading}>
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">{loading ? "Sending..." : "Send Message"}</p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="" aria-hidden="true" />
                    </div>
                  </div>
                </button>

                {/* Success/Error status */}
                <div
                  aria-live="polite"
                  className={`text-sm mt-2 ${status.type === "error" ? "text-red-400" : "text-white-50"}`}
                >
                  {status.msg}
                </div>
              </form>
            </div>
          </div>

          {/* 3D panel */}
          <div className="xl:col-span-7 min-h-96">
            <div className="bg-[#cd7c2e] w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
              <ContactExperience />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
