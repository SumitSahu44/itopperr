import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Trash2,
  Edit2,
  X,
  Check,
  FileText,
  ExternalLink,
  Loader2,
  LayoutGrid,
  Upload,
  Link2,
} from "lucide-react";
import { getBlogs, addBlog, updateBlog, deleteBlog } from "../utils/blogStorage";

const AdminBlogsDashboard = () => {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [blogLoading, setBlogLoading] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  // Blog Form States
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("Strategy");
  const [blogReadTime, setBlogReadTime] = useState("5 min read");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogPublished, setBlogPublished] = useState(true);

  // Upload state
  const [imageInputMethod, setImageInputMethod] = useState("upload"); // 'upload' or 'url'

  // SEO fields
  const [seoTitle, setSeoTitle] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");

  const fetchBlogs = async () => {
    setBlogLoading(true);
    try {
      const data = await getBlogs();
      setBlogs(data);
    } catch (err) {
      console.error("Failed to load blogs:", err);
    } finally {
      setBlogLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (showBlogForm && editorRef.current) {
      editorRef.current.innerHTML = editingBlog ? editingBlog.content : "";
    }
  }, [showBlogForm, editingBlog]);

  const executeCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setBlogContent(editorRef.current.innerHTML);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlogImage(reader.result); // Base64 data URL
      };
      reader.readAsDataURL(file);
    }
  };

  const resetBlogForm = () => {
    setBlogTitle("");
    setBlogCategory("Strategy");
    setBlogReadTime("5 min read");
    setBlogExcerpt("");
    setBlogImage("");
    setBlogContent("");
    setBlogPublished(true);
    setSeoTitle("");
    setSeoKeywords("");
    setEditingBlog(null);
    setImageInputMethod("upload");
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
    }
  };

  const handleSaveBlog = async () => {
    if (!blogTitle.trim() || !blogExcerpt.trim() || !blogContent.trim()) {
      alert("Please fill in the title, excerpt, and content.");
      return;
    }
    const blogData = {
      title: blogTitle.trim(),
      category: blogCategory,
      readTime: blogReadTime.trim() || "5 min read",
      excerpt: blogExcerpt.trim(),
      image: blogImage.trim() || "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400",
      content: blogContent,
      published: blogPublished,
      seoTitle: seoTitle.trim() || blogTitle.trim(),
      seoKeywords: seoKeywords.trim(),
    };

    try {
      if (editingBlog) {
        await updateBlog(editingBlog.id, blogData);
      } else {
        await addBlog(blogData);
      }
      setShowBlogForm(false);
      fetchBlogs();
    } catch (err) {
      alert("Failed to save article.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-[#EF961D]/20">
      {/* TOPBAR */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#163F66] rounded-xl flex items-center justify-center shadow-md">
              <LayoutGrid size={20} className="text-white" />
            </div>
            <h1 className="text-lg font-black tracking-tight text-[#163F66]">
              iTopper<span className="text-[#EF961D] font-medium"> Blog Manager</span>
            </h1>
          </div>
          <Link
            to="/"
            id="view-website-btn"
            className="flex items-center gap-2 text-xs font-bold text-[#163F66] hover:text-[#EF961D] px-4 py-2 border border-slate-200 rounded-full hover:bg-slate-50 transition-all shadow-sm"
          >
            Go to Website <ExternalLink size={12} />
          </Link>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-[#163F66]">Blog Articles</h2>
              <p className="text-sm text-slate-500 mt-1">Publish, edit, and optimize articles for SEO</p>
            </div>
            <button
              onClick={() => {
                resetBlogForm();
                setShowBlogForm(true);
              }}
              id="new-article-btn"
              className="flex items-center gap-2 px-6 py-3 bg-[#163F66] text-white hover:bg-[#EF961D] rounded-full font-bold shadow-md hover:shadow-lg hover:scale-103 transition-all cursor-pointer"
            >
              <Plus size={20} /> Write Article
            </button>
          </div>

          {blogLoading ? (
            <div className="p-20 flex justify-center">
              <Loader2 className="animate-spin text-[#EF961D] w-8 h-8" />
            </div>
          ) : blogs.length === 0 ? (
            <div className="p-20 text-center text-slate-500 bg-white border border-slate-200 border-dashed rounded-3xl shadow-sm">
              No blog posts created yet. Click "Write Article" to publish your first post!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((b) => (
                <div
                  key={b.id}
                  className="group bg-white rounded-3xl border border-slate-200/80 hover:border-[#163F66]/30 hover:shadow-xl transition-all flex flex-col overflow-hidden shadow-sm"
                >
                  <div className="relative h-48 bg-slate-100 overflow-hidden border-b border-slate-100">
                    <img
                      src={b.image || "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400"}
                      alt={b.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setEditingBlog(b);
                          setBlogTitle(b.title);
                          setBlogCategory(b.category);
                          setBlogReadTime(b.readTime);
                          setBlogExcerpt(b.excerpt);
                          setBlogImage(b.image);
                          setBlogContent(b.content);
                          setBlogPublished(b.published);
                          setSeoTitle(b.seoTitle || "");
                          setSeoKeywords(b.seoKeywords || "");
                          setImageInputMethod(b.image?.startsWith("data:") ? "upload" : "url");
                          setShowBlogForm(true);
                        }}
                        className="p-2 bg-white/95 rounded-full text-slate-800 hover:bg-[#163F66] hover:text-white border border-slate-200 shadow-md cursor-pointer transition-colors"
                        title="Edit Article"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={async () => {
                          if (window.confirm("Are you sure you want to delete this article?")) {
                            try {
                              await deleteBlog(b.id);
                              fetchBlogs();
                            } catch (err) {
                              alert("Failed to delete article.");
                            }
                          }
                        }}
                        className="p-2 bg-white/95 rounded-full text-slate-800 hover:bg-red-500 hover:text-white border border-slate-200 shadow-md cursor-pointer transition-colors"
                        title="Delete Article"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <span className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-sm ${b.published ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-orange-50 text-orange-500 border border-orange-200'}`}>
                      {b.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase block mb-1">
                        {b.category} • {b.readTime}
                      </span>
                      <h3 className="text-xl font-bold text-[#163F66] mb-2 line-clamp-2">
                        {b.title}
                      </h3>
                      <p className="text-slate-500 text-sm line-clamp-3 mb-4 font-semibold leading-relaxed">
                        {b.excerpt}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400 font-bold">
                      <span>{b.date}</span>
                      <Link to={`/blog/${b.id}`} className="text-[#163F66] hover:text-[#EF961D] font-bold flex items-center gap-1 transition-colors">
                        View Live <ExternalLink size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* WRITE / EDIT BLOG FORM SIDE PANEL */}
      {showBlogForm && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
            onClick={() => setShowBlogForm(false)}
          ></div>
          <div className="relative w-full max-w-5xl bg-white h-full shadow-2xl overflow-y-auto border-l border-slate-200 animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="sticky top-0 bg-white border-b border-slate-150 p-6 flex justify-between items-center z-20 shadow-sm">
              <div>
                <h2 className="text-2xl font-black text-[#163F66]">
                  {editingBlog ? "Edit Article" : "Write New Article"}
                </h2>
              </div>
              <button
                onClick={() => setShowBlogForm(false)}
                className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-450 hover:text-black cursor-pointer border border-slate-200"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-8 flex-grow">
              <style>{`
                .rich-editor-content:focus { outline: none; }
                .rich-editor-content h1 { font-size: 1.75rem; font-weight: 800; margin-top: 1.25rem; margin-bottom: 0.5rem; color: #163F66; }
                .rich-editor-content h2 { font-size: 1.4rem; font-weight: 700; margin-top: 1rem; margin-bottom: 0.4rem; color: #163F66; }
                .rich-editor-content h3 { font-size: 1.25rem; font-weight: 700; margin-top: 0.8rem; margin-bottom: 0.3rem; color: #163F66; }
                .rich-editor-content p { margin-bottom: 0.75rem; color: #334155; line-height: 1.65; }
                .rich-editor-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 0.75rem; color: #334155; }
                .rich-editor-content ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 0.75rem; color: #334155; }
                .rich-editor-content blockquote { border-left: 4px solid #EF961D; padding-left: 1rem; font-style: italic; margin: 1rem 0; color: #475569; }
                .rich-editor-content img { border-radius: 0.5rem; margin: 1rem auto; max-width: 100%; display: block; }
              `}</style>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-[#163F66] mb-2">Title</label>
                    <input
                      type="text"
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      placeholder="e.g. Mastering Mains Answer Writing"
                      className="w-full bg-slate-50 border border-slate-250 focus:border-[#163F66] focus:bg-white rounded-xl px-4 py-3 text-slate-800 outline-none transition-all font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#163F66] mb-2">Excerpt / Subtitle</label>
                    <textarea
                      value={blogExcerpt}
                      onChange={(e) => setBlogExcerpt(e.target.value)}
                      placeholder="Short summary displayed on the blog card list..."
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-250 focus:border-[#163F66] focus:bg-white rounded-xl px-4 py-3 text-slate-800 outline-none transition-all resize-none font-semibold leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#163F66] mb-2">Article Body Content</label>
                    <div className="border border-slate-250 rounded-2xl overflow-hidden bg-white shadow-sm">
                      <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-50 border-b border-slate-200">
                        <button
                          type="button"
                          onClick={() => executeCommand("bold")}
                          className="p-1.5 hover:bg-[#163F66]/10 rounded text-slate-700 font-bold w-8 h-8 flex items-center justify-center text-sm cursor-pointer"
                          title="Bold"
                        >
                          B
                        </button>
                        <button
                          type="button"
                          onClick={() => executeCommand("italic")}
                          className="p-1.5 hover:bg-[#163F66]/10 rounded text-slate-700 italic w-8 h-8 flex items-center justify-center text-sm cursor-pointer"
                          title="Italic"
                        >
                          I
                        </button>
                        <button
                          type="button"
                          onClick={() => executeCommand("underline")}
                          className="p-1.5 hover:bg-[#163F66]/10 rounded text-slate-700 underline w-8 h-8 flex items-center justify-center text-sm cursor-pointer"
                          title="Underline"
                        >
                          U
                        </button>
                        <button
                          type="button"
                          onClick={() => executeCommand("strikeThrough")}
                          className="p-1.5 hover:bg-[#163F66]/10 rounded text-slate-700 line-through w-8 h-8 flex items-center justify-center text-sm cursor-pointer"
                          title="Strikethrough"
                        >
                          S
                        </button>
                        <div className="h-6 w-px bg-slate-200 mx-1" />
                        <button
                          type="button"
                          onClick={() => executeCommand("formatBlock", "<h1>")}
                          className="p-1.5 hover:bg-[#163F66]/10 rounded text-slate-700 font-bold text-xs cursor-pointer"
                          title="Heading 1"
                        >
                          H1
                        </button>
                        <button
                          type="button"
                          onClick={() => executeCommand("formatBlock", "<h2>")}
                          className="p-1.5 hover:bg-[#163F66]/10 rounded text-slate-700 font-bold text-xs cursor-pointer"
                          title="Heading 2"
                        >
                          H2
                        </button>
                        <button
                          type="button"
                          onClick={() => executeCommand("formatBlock", "<h3>")}
                          className="p-1.5 hover:bg-[#163F66]/10 rounded text-slate-700 font-bold text-xs cursor-pointer"
                          title="Heading 3"
                        >
                          H3
                        </button>
                        <button
                          type="button"
                          onClick={() => executeCommand("formatBlock", "<p>")}
                          className="p-1.5 hover:bg-[#163F66]/10 rounded text-slate-700 font-bold text-xs cursor-pointer"
                          title="Paragraph"
                        >
                          P
                        </button>
                        <div className="h-6 w-px bg-slate-200 mx-1" />
                        <button
                          type="button"
                          onClick={() => executeCommand("insertUnorderedList")}
                          className="p-1.5 hover:bg-[#163F66]/10 rounded text-slate-700 font-bold text-xs cursor-pointer"
                          title="Bullet List"
                        >
                          • List
                        </button>
                        <button
                          type="button"
                          onClick={() => executeCommand("insertOrderedList")}
                          className="p-1.5 hover:bg-[#163F66]/10 rounded text-slate-700 font-bold text-xs cursor-pointer"
                          title="Numbered List"
                        >
                          1. List
                        </button>
                        <button
                          type="button"
                          onClick={() => executeCommand("formatBlock", "<blockquote>")}
                          className="p-1.5 hover:bg-[#163F66]/10 rounded text-slate-700 font-bold text-xs cursor-pointer"
                          title="Quote"
                        >
                          “ Quote
                        </button>
                        <div className="h-6 w-px bg-slate-200 mx-1" />
                        <button
                          type="button"
                          onClick={() => {
                            const url = prompt("Enter image URL:");
                            if (url) executeCommand("insertImage", url);
                          }}
                          className="p-1.5 hover:bg-[#163F66]/10 rounded text-slate-700 font-bold text-xs cursor-pointer"
                          title="Insert Image"
                        >
                          Image
                        </button>
                      </div>

                      <div
                        ref={editorRef}
                        contentEditable
                        onInput={(e) => setBlogContent(e.currentTarget.innerHTML)}
                        className="rich-editor-content min-h-[350px] max-h-[500px] overflow-y-auto p-5 text-slate-800 bg-white font-sans text-base leading-relaxed"
                        placeholder="Write article details here..."
                        style={{ outline: "none" }}
                      />
                    </div>
                  </div>

                  {/* SEO Configuration Section */}
                  <div className="p-6 bg-slate-50 border border-slate-250 rounded-2xl space-y-4">
                    <h3 className="text-lg font-bold text-[#163F66] flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#EF961D]"></span>
                      SEO Optimization Details
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">SEO Title Meta Tag</label>
                        <input
                          type="text"
                          value={seoTitle}
                          onChange={(e) => setSeoTitle(e.target.value)}
                          placeholder="e.g. Master Answer Writing for UPSC | iTopper Guide"
                          className="w-full bg-white border border-slate-250 focus:border-[#163F66] rounded-xl px-4 py-3 text-slate-800 text-sm outline-none font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Meta Keywords (Comma separated)</label>
                        <input
                          type="text"
                          value={seoKeywords}
                          onChange={(e) => setSeoKeywords(e.target.value)}
                          placeholder="upsc, answer writing, gs, mains preparation, exam strategy"
                          className="w-full bg-white border border-slate-250 focus:border-[#163F66] rounded-xl px-4 py-3 text-slate-800 text-sm outline-none font-semibold"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-[#163F66] mb-2">Category</label>
                    <select
                      value={blogCategory}
                      onChange={(e) => setBlogCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-250 focus:border-[#163F66] rounded-xl px-4 py-3 text-slate-800 outline-none font-semibold"
                    >
                      <option value="Strategy">Strategy</option>
                      <option value="Syllabus Guide">Syllabus Guide</option>
                      <option value="Current Affairs">Current Affairs</option>
                      <option value="Mentorship">Mentorship</option>
                      <option value="UPSC GS">UPSC GS</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#163F66] mb-2">Read Time</label>
                    <input
                      type="text"
                      value={blogReadTime}
                      onChange={(e) => setBlogReadTime(e.target.value)}
                      placeholder="e.g. 5 min read"
                      className="w-full bg-slate-50 border border-slate-250 focus:border-[#163F66] rounded-xl px-4 py-3 text-slate-800 outline-none font-semibold"
                    />
                  </div>

                  {/* FEATURED IMAGE UPLOADER */}
                  <div>
                    <label className="block text-sm font-bold text-[#163F66] mb-2">Featured Image</label>
                    <div className="flex gap-2 mb-3">
                      <button
                        type="button"
                        onClick={() => setImageInputMethod("upload")}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${imageInputMethod === 'upload' ? 'bg-[#163F66] text-white border-[#163F66]' : 'bg-slate-50 border-slate-250 text-slate-650 hover:bg-slate-100'}`}
                      >
                        <Upload size={13} /> Upload File
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageInputMethod("url")}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${imageInputMethod === 'url' ? 'bg-[#163F66] text-white border-[#163F66]' : 'bg-slate-50 border-slate-250 text-slate-650 hover:bg-slate-100'}`}
                      >
                        <Link2 size={13} /> Image URL
                      </button>
                    </div>

                    {imageInputMethod === "upload" ? (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-slate-250 rounded-2xl p-6 text-center cursor-pointer hover:bg-slate-50 transition-colors flex flex-col items-center justify-center gap-2 group min-h-[140px]"
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          accept="image/*"
                          className="hidden"
                        />
                        <Upload className="w-8 h-8 text-slate-400 group-hover:text-[#163F66] transition-colors" />
                        <span className="text-xs font-bold text-[#163F66]">Click to upload image file</span>
                        <span className="text-[10px] text-slate-450 leading-tight">PNG, JPG, or WEBP. Local browser storage.</span>
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={blogImage}
                        onChange={(e) => setBlogImage(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-slate-50 border border-slate-250 focus:border-[#163F66] rounded-xl px-4 py-3 text-slate-800 text-sm outline-none font-semibold"
                      />
                    )}

                    {blogImage && (
                      <div className="mt-4 rounded-xl overflow-hidden border border-slate-200 aspect-video shadow-inner bg-slate-100 relative group">
                        <img src={blogImage} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setBlogImage("")}
                          className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-black text-white rounded-full transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-[#163F66]">Publish Directly</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-tight font-medium">If disabled, this post will save as a Draft</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={blogPublished}
                        onChange={(e) => setBlogPublished(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-slate-150 p-6 flex justify-between items-center z-20 shadow-md">
              <button
                onClick={() => setShowBlogForm(false)}
                className="px-6 py-3 text-slate-500 hover:text-black font-bold cursor-pointer"
                id="cancel-blog-btn"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBlog}
                className="px-8 py-3 bg-[#163F66] text-white hover:bg-[#EF961D] font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                id="save-blog-btn"
              >
                <Check size={18} /> Save Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogsDashboard;
