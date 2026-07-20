// // import React, { useEffect, useRef, useState } from 'react';

// // const API_BASE_URL = '';
// // const tinyMceApiKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY;

// // let tinyMceLoader = null;

// // const loadTinyMce = () => {
// //   if (typeof window === 'undefined') return Promise.reject(new Error('TinyMCE can only load in the browser.'));
// //   if (window.tinymce) return Promise.resolve(window.tinymce);
// //   if (!tinyMceApiKey) return Promise.reject(new Error('TinyMCE API key is not configured.'));

// //   if (!tinyMceLoader) {
// //     tinyMceLoader = new Promise((resolve, reject) => {
// //       const script = document.createElement('script');
// //       script.src = `https://cdn.tiny.cloud/1/${tinyMceApiKey}/tinymce/7/tinymce.min.js`;
// //       script.referrerPolicy = 'origin';
// //       script.onload = () => resolve(window.tinymce);
// //       script.onerror = () => reject(new Error('TinyMCE failed to load.'));
// //       document.head.appendChild(script);
// //     });
// //   }

// //   return tinyMceLoader;
// // };

// // const uploadImage = async (blobInfo) => {
// //   const formData = new FormData();
// //   formData.append('courseImage', blobInfo.blob(), blobInfo.filename());

// //   const token = localStorage.getItem('adminToken');
// //   const response = await fetch(`${API_BASE_URL}/api/upload/course-image`, {
// //     method: 'POST',
// //     headers: token ? { Authorization: `Bearer ${token}` } : {},
// //     body: formData,
// //   });
// //   const data = await response.json();

// //   if (!response.ok || !data.success) {
// //     throw new Error(data.message || 'Image upload failed.');
// //   }

// //   return data.imagePath?.startsWith('http') ? data.imagePath : `${API_BASE_URL}${data.imagePath}`;
// // };

// // const TinyMCEEditor = ({
// //   value = '',
// //   onChange,
// //   placeholder = 'Write content...',
// //   minHeight = 320,
// //   className = '',
// // }) => {
// //   const textareaRef = useRef(null);
// //   const editorRef = useRef(null);
// //   const lastValueRef = useRef(value || '');
// //   const [loadError, setLoadError] = useState('');

// //   useEffect(() => {
// //     let isMounted = true;

// //     loadTinyMce()
// //       .then((tinymce) => tinymce.init({
// //         target: textareaRef.current,
// //         height: minHeight,
// //         menubar: false,
// //         branding: false,
// //         promotion: false,
// //         placeholder,
// //         skin: 'oxide-dark',
// //         content_css: 'dark',
// //         plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount',
// //         toolbar: 'undo redo | blocks fontsize | bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table | removeformat code fullscreen',
// //         images_upload_handler: uploadImage,
// //         automatic_uploads: true,
// //         file_picker_types: 'image',
// //         setup: (editor) => {
// //           editorRef.current = editor;
// //           editor.on('init', () => {
// //             editor.setContent(lastValueRef.current || '');
// //           });
// //           editor.on('change keyup undo redo setcontent', () => {
// //             const content = editor.getContent();
// //             lastValueRef.current = content;
// //             onChange?.(content);
// //           });
// //         },
// //         content_style: `
// //           body { background: #000; color: #fff; font-family: Inter, Arial, sans-serif; font-size: 15px; line-height: 1.6; }
// //           a { color: #00B7B3; }
// //           blockquote { border-left: 4px solid #00B7B3; margin-left: 0; padding-left: 16px; color: #d1d5db; }
// //           img { max-width: 100%; height: auto; border-radius: 8px; }
// //         `,
// //       }))
// //       .catch((error) => {
// //         if (isMounted) setLoadError(error.message);
// //       });

// //     return () => {
// //       isMounted = false;
// //       if (editorRef.current) {
// //         editorRef.current.remove();
// //         editorRef.current = null;
// //       }
// //     };
// //   }, [minHeight, onChange, placeholder]);

// //   useEffect(() => {
// //     if (value === lastValueRef.current) return;
// //     lastValueRef.current = value || '';
// //     if (editorRef.current && editorRef.current.initialized) {
// //       editorRef.current.setContent(lastValueRef.current);
// //     }
// //   }, [value]);

// //   if (!tinyMceApiKey || loadError) {
// //     return (
// //       <div className={className}>
// //         <textarea
// //           value={value}
// //           onChange={(event) => onChange?.(event.target.value)}
// //           placeholder={placeholder}
// //           rows={8}
// //           className="w-full rounded-lg border border-gray-700 bg-black/60 px-4 py-3 text-white outline-none focus:border-[#00B7B3]"
// //         />
// //         <p className="mt-2 text-xs text-amber-300">
// //           {loadError || 'TinyMCE API key is missing. Add NEXT_PUBLIC_TINYMCE_API_KEY to your frontend .env file.'}
// //         </p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className={className}>
// //       <textarea ref={textareaRef} defaultValue={value} />
// //     </div>
// //   );
// // };

// // export default TinyMCEEditor;



// "use client";

// import { Editor } from "@tinymce/tinymce-react";
// import { useRef, useCallback } from "react";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// const RichTextEditor = ({ 
//   value = '', 
//   onChange, 
//   height = 500, 
//   uploadFolder = "blogs",
//   className = "",
//   placeholder = "Write content here..."
// }) => {
//   const editorRef = useRef(null);

//   // ✅ Stable onChange callback
//   const handleEditorChange = useCallback((content) => {
//     if (onChange) {
//       onChange(content);
//     }
//   }, [onChange]);

//   // ✅ Image Upload Handler
//   const handleUpload = useCallback(async (blobInfo) => {
//     return new Promise(async (resolve, reject) => {
//       try {
//         const formData = new FormData();
//         formData.append("file", blobInfo.blob(), blobInfo.filename());
//         formData.append("folder", uploadFolder);
        
//         const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
//         const response = await fetch(`${API_BASE_URL}/api/upload`, {
//           method: "POST",
//           headers: token ? { Authorization: `Bearer ${token}` } : {},
//           body: formData,
//         });
        
//         const data = await response.json();
        
//         if (data.success) {
//           const imageUrl = data.location || data.url || data.imagePath;
//           resolve(imageUrl?.startsWith('http') ? imageUrl : `${API_BASE_URL}${imageUrl}`);
//         } else {
//           reject(data.message || "Upload failed");
//         }
//       } catch (error) {
//         reject(error.message);
//       }
//     });
//   }, [uploadFolder]);

//   // ✅ Handle image delete from server
//   const handleImageDelete = useCallback(async () => {
//     const editor = editorRef.current;
//     if (!editor) return;
    
//     const selectedNode = editor.selection.getNode();
//     if (selectedNode && selectedNode.nodeName === 'IMG') {
//       const imageUrl = selectedNode.src;
      
//       if (confirm("Delete this image permanently? This action cannot be undone.")) {
//         try {
//           const urlParts = imageUrl.split('/uploads/');
//           if (urlParts.length > 1) {
//             const imagePath = '/uploads/' + urlParts[1];
            
//             const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
//             const response = await fetch(`${API_BASE_URL}/api/admin/images?path=${encodeURIComponent(imagePath)}`, {
//               method: "DELETE",
//               headers: token ? { Authorization: `Bearer ${token}` } : {},
//             });
            
//             const data = await response.json();
//             if (data.success) {
//               editor.dom.remove(selectedNode);
//               // Trigger change event
//               const content = editor.getContent();
//               if (onChange) {
//                 onChange(content);
//               }
//               alert("✅ Image deleted successfully!");
//             } else {
//               alert("❌ Failed to delete image");
//             }
//           }
//         } catch (error) {
//           console.error("Error deleting image:", error);
//           alert("❌ Error deleting image");
//         }
//       }
//     } else {
//       alert("⚠️ Please click on an image first to select it");
//     }
//   }, [onChange]);

//   return (
//     <div className={className}>
//       {/* Delete Button */}
//       <div className="mb-3 flex flex-wrap items-center gap-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
//         <button
//           type="button"
//           onClick={handleImageDelete}
//           className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition flex items-center gap-2"
//         >
//           <span>🗑️</span> Delete Selected Image
//         </button>
//         <p className="text-xs text-gray-400">
//           Click on an image in the editor, then click this button to delete it permanently
//         </p>
//       </div>
      
//       <Editor
//         onInit={(evt, editor) => {
//           editorRef.current = editor;
//         }}
//         apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
//         value={value}
//         onEditorChange={handleEditorChange}
//         init={{
//           height: height,
//           width: "100%",
//           menubar: "file edit view insert format tools table help",
          
//           // ✅ FREE PLUGINS ONLY
//           plugins: [
//             'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
//             'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
//             'insertdatetime', 'media', 'table', 'help', 'wordcount', 'emoticons',
//             'visualchars', 'nonbreaking', 'directionality'
//           ],
          
//           // ✅ Full Toolbar
//           toolbar: [
//             { name: 'history', items: ['undo', 'redo'] },
//             { name: 'formatting', items: ['bold', 'italic', 'underline', 'strikethrough', 'removeformat'] },
//             { name: 'alignment', items: ['alignleft', 'aligncenter', 'alignright', 'alignjustify'] },
//             { name: 'lists', items: ['bullist', 'numlist', 'outdent', 'indent'] },
//             { name: 'styles', items: ['formatselect', 'fontsizeselect', 'fontselect'] },
//             { name: 'colors', items: ['forecolor', 'backcolor'] },
//             { name: 'insert', items: ['link', 'image', 'media', 'table', 'hr', 'charmap', 'emoticons'] },
//             { name: 'views', items: ['fullscreen', 'code', 'preview', 'visualblocks', 'visualchars'] },
//             { name: 'tools', items: ['searchreplace', 'wordcount', 'help'] }
//           ],
          
//           toolbar1: 'undo redo | formatselect fontselect fontsizeselect | bold italic underline strikethrough | forecolor backcolor',
//           toolbar2: 'alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent | blockquote',
//           toolbar3: 'link image media table | hr charmap emoticons | removeformat',
//           toolbar4: 'fullscreen code preview | visualblocks visualchars | searchreplace wordcount help',
          
//           fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt 72pt',
//           font_formats: 'Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; Georgia=georgia,serif; Tahoma=tahoma,arial,helvetica,sans-serif; Times New Roman=times new roman,times,serif; Trebuchet MS=trebuchet ms,geneva,sans-serif; Verdana=verdana,geneva,sans-serif',
          
//           // Dark theme for admin
//           skin: 'oxide-dark',
//           content_css: 'dark',
          
//           content_style: `
//             body { 
//               font-family: Arial, Helvetica, sans-serif; 
//               font-size: 14px; 
//               line-height: 1.8;
//               color: #e0e0e0;
//               background: #1a1a1a;
//               padding: 20px;
//               margin: 0;
//             }
//             h1 { font-size: 2.5em; font-weight: bold; margin: 0.67em 0; color: #ffffff; }
//             h2 { font-size: 2em; font-weight: bold; margin: 0.83em 0; color: #f0f0f0; }
//             h3 { font-size: 1.5em; font-weight: bold; margin: 1em 0; color: #e8e8e8; }
//             h4 { font-size: 1.17em; font-weight: bold; margin: 1.33em 0; color: #e0e0e0; }
//             p { margin: 0 0 1.2em 0; }
//             a { color: #00B7B3; text-decoration: underline; }
//             a:hover { color: #00d4d0; }
//             blockquote { 
//               border-left: 4px solid #00B7B3; 
//               margin: 1em 0; 
//               padding-left: 20px; 
//               color: #b0b0b0;
//               font-style: italic;
//             }
//             img { 
//               max-width: 100%; 
//               height: auto; 
//               border-radius: 8px;
//               cursor: pointer;
//               margin: 10px 0;
//             }
//             img:focus { outline: 2px solid #00B7B3; outline-offset: 2px; }
//             table { 
//               border-collapse: collapse; 
//               width: 100%; 
//               margin: 1em 0;
//               background: #2a2a2a;
//             }
//             td, th { 
//               border: 1px solid #444; 
//               padding: 10px; 
//               text-align: left;
//             }
//             th { 
//               background: #333;
//               color: #fff;
//               font-weight: bold;
//             }
//             tr:nth-child(even) { background: #222; }
//             pre { 
//               background: #2d2d2d; 
//               padding: 15px; 
//               border-radius: 8px; 
//               overflow-x: auto;
//               border: 1px solid #444;
//               color: #e0e0e0;
//             }
//             code { 
//               background: #2d2d2d; 
//               padding: 3px 8px; 
//               border-radius: 4px; 
//               font-family: 'Courier New', monospace;
//               color: #e0e0e0;
//               border: 1px solid #444;
//             }
//             pre code { 
//               background: transparent; 
//               padding: 0; 
//               border: none;
//             }
//             ul, ol { margin: 0 0 1em 2em; }
//             li { margin: 0.3em 0; }
//             hr { 
//               border: 0; 
//               border-top: 2px solid #444; 
//               margin: 2em 0;
//             }
//           `,
          
//           images_upload_handler: handleUpload,
//           automatic_uploads: true,
//           file_picker_types: 'image media',
//           image_caption: true,
//           image_advtab: true,
//           image_title: true,
//           image_dimensions: true,
          
//           media_live_embeds: true,
//           media_alt_source: true,
//           media_poster: true,
          
//           table_default_attributes: { border: '1', cellspacing: '0', cellpadding: '8' },
//           table_default_styles: { width: '100%', borderCollapse: 'collapse' },
//           table_resize_bars: true,
//           table_toolbar: 'tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol | tablecellmerge tablecellprops',
          
//           relative_urls: false,
//           remove_script_host: false,
//           convert_urls: true,
          
//           spellchecker_language: 'en',
//           spellchecker_languages: 'English=en, Hindi=hi, Spanish=es, French=fr, German=de',
          
//           placeholder: placeholder,
//           statusbar: true,
//           resize: 'both',
//           branding: true,
          
//           advlist_number_styles: 'lower-alpha,lower-roman,upper-alpha,upper-roman',
//           advlist_bullet_styles: 'circle,square,disc',
          
//           setup: (editor) => {
//             // Image click selection
//             editor.on('click', (e) => {
//               if (e.target.nodeName === 'IMG') {
//                 editor.selection.select(e.target);
//               }
//             });
            
//             // Image double click for properties
//             editor.on('dblclick', (e) => {
//               if (e.target.nodeName === 'IMG') {
//                 editor.execCommand('mceImage');
//               }
//             });
            
//             // Keyboard shortcuts
//             editor.addShortcut('meta+b', 'Bold', () => editor.execCommand('Bold'));
//             editor.addShortcut('meta+i', 'Italic', () => editor.execCommand('Italic'));
//             editor.addShortcut('meta+u', 'Underline', () => editor.execCommand('Underline'));
//             editor.addShortcut('meta+z', 'Undo', () => editor.execCommand('Undo'));
//             editor.addShortcut('meta+shift+z', 'Redo', () => editor.execCommand('Redo'));
//             editor.addShortcut('meta+k', 'Link', () => editor.execCommand('mceLink'));
//           }
//         }}
//       />
//     </div>
//   );
// };

// export default RichTextEditor;


"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useRef, useCallback } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

const RichTextEditor = ({ 
  value = '', 
  onChange, 
  height = 500, 
  uploadFolder = "blogs",
  className = "",
  placeholder = "Write content here..."
}) => {
  const editorRef = useRef(null);

  const handleEditorChange = useCallback((content) => {
    if (onChange) {
      onChange(content);
    }
  }, [onChange]);

  const handleUpload = useCallback(async (blobInfo) => {
    return new Promise(async (resolve, reject) => {
      try {
        const formData = new FormData();
        formData.append("file", blobInfo.blob(), blobInfo.filename());
        formData.append("folder", uploadFolder);
        
        const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/upload`, {
          method: "POST",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          body: formData,
        });
        
        const data = await response.json();
        
        if (data.success) {
          const imageUrl = data.location || data.url || data.imagePath;
          resolve(imageUrl?.startsWith('http') ? imageUrl : `${API_BASE_URL}${imageUrl}`);
        } else {
          reject(data.message || "Upload failed");
        }
      } catch (error) {
        reject(error.message);
      }
    });
  }, [uploadFolder]);

  const handleImageDelete = useCallback(async () => {
    const editor = editorRef.current;
    if (!editor) return;
    
    const selectedNode = editor.selection.getNode();
    if (selectedNode && selectedNode.nodeName === 'IMG') {
      const imageUrl = selectedNode.src;
      
      if (confirm("Delete this image permanently? This action cannot be undone.")) {
        try {
          const urlParts = imageUrl.split('/uploads/');
          if (urlParts.length > 1) {
            const imagePath = '/uploads/' + urlParts[1];
            
            const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/admin/images?path=${encodeURIComponent(imagePath)}`, {
              method: "DELETE",
              headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            
            const data = await response.json();
            if (data.success) {
              editor.dom.remove(selectedNode);
              const content = editor.getContent();
              if (onChange) {
                onChange(content);
              }
              alert("✅ Image deleted successfully!");
            } else {
              alert("❌ Failed to delete image");
            }
          }
        } catch (error) {
          console.error("Error deleting image:", error);
          alert("❌ Error deleting image");
        }
      }
    } else {
      alert("⚠️ Please click on an image first to select it");
    }
  }, [onChange]);

  return (
    <div className={className}>
      {/* Delete Button */}
      <div className="mb-3 flex flex-wrap items-center gap-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
        <button
          type="button"
          onClick={handleImageDelete}
          className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition flex items-center gap-2"
        >
          <span>🗑️</span> Delete Selected Image
        </button>
        <p className="text-xs text-gray-400">
          Click on an image in the editor, then click this button to delete it permanently
        </p>
      </div>
      
      <Editor
        onInit={(evt, editor) => {
          editorRef.current = editor;
        }}
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        value={value}
        onEditorChange={handleEditorChange}
        init={{
          height: height,
          width: "100%",
          menubar: "file edit view insert format tools table help",
          
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount', 'emoticons',
            'visualchars', 'nonbreaking', 'directionality'
          ],
          
          toolbar: [
            { name: 'history', items: ['undo', 'redo'] },
            { name: 'formatting', items: ['bold', 'italic', 'underline', 'strikethrough', 'removeformat'] },
            { name: 'alignment', items: ['alignleft', 'aligncenter', 'alignright', 'alignjustify'] },
            { name: 'lists', items: ['bullist', 'numlist', 'outdent', 'indent'] },
            { name: 'styles', items: ['formatselect', 'fontsizeselect', 'fontselect'] },
            { name: 'colors', items: ['forecolor', 'backcolor'] },
            { name: 'insert', items: ['link', 'image', 'media', 'table', 'hr', 'charmap', 'emoticons'] },
            { name: 'views', items: ['fullscreen', 'code', 'preview', 'visualblocks', 'visualchars'] },
            { name: 'tools', items: ['searchreplace', 'wordcount', 'help'] }
          ],
          
          toolbar1: 'undo redo | formatselect fontselect fontsizeselect | bold italic underline strikethrough | forecolor backcolor',
          toolbar2: 'alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent | blockquote',
          toolbar3: 'link image media table | hr charmap emoticons | removeformat',
          toolbar4: 'fullscreen code preview | visualblocks visualchars | searchreplace wordcount help',
          
          fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt 72pt',
          font_formats: 'Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; Georgia=georgia,serif; Tahoma=tahoma,arial,helvetica,sans-serif; Times New Roman=times new roman,times,serif; Trebuchet MS=trebuchet ms,geneva,sans-serif; Verdana=verdana,geneva,sans-serif',
          
          skin: 'oxide-dark',
          content_css: 'dark',
          
          content_style: `
            body { 
              font-family: Arial, Helvetica, sans-serif; 
              font-size: 14px; 
              line-height: 1.8;
              color: #e0e0e0;
              background: #1a1a1a;
              padding: 20px;
              margin: 0;
            }
            h1 { font-size: 2.5em; font-weight: bold; margin: 0.67em 0; color: #ffffff; }
            h2 { font-size: 2em; font-weight: bold; margin: 0.83em 0; color: #f0f0f0; }
            h3 { font-size: 1.5em; font-weight: bold; margin: 1em 0; color: #e8e8e8; }
            h4 { font-size: 1.17em; font-weight: bold; margin: 1.33em 0; color: #e0e0e0; }
            p { margin: 0 0 1.2em 0; }
            a { color: #00B7B3; text-decoration: underline; }
            a:hover { color: #00d4d0; }
            blockquote { 
              border-left: 4px solid #00B7B3; 
              margin: 1em 0; 
              padding-left: 20px; 
              color: #b0b0b0;
              font-style: italic;
            }
            img { 
              max-width: 100%; 
              height: auto; 
              border-radius: 8px;
              cursor: pointer;
              margin: 10px 0;
            }
            img:focus { outline: 2px solid #00B7B3; outline-offset: 2px; }
            table { 
              border-collapse: collapse; 
              width: 100%; 
              margin: 1em 0;
              background: #2a2a2a;
            }
            td, th { 
              border: 1px solid #444; 
              padding: 10px; 
              text-align: left;
            }
            th { 
              background: #333;
              color: #fff;
              font-weight: bold;
            }
            tr:nth-child(even) { background: #222; }
            pre { 
              background: #2d2d2d; 
              padding: 15px; 
              border-radius: 8px; 
              overflow-x: auto;
              border: 1px solid #444;
              color: #e0e0e0;
            }
            code { 
              background: #2d2d2d; 
              padding: 3px 8px; 
              border-radius: 4px; 
              font-family: 'Courier New', monospace;
              color: #e0e0e0;
              border: 1px solid #444;
            }
            pre code { 
              background: transparent; 
              padding: 0; 
              border: none;
            }
            ul, ol { margin: 0 0 1em 2em; }
            li { margin: 0.3em 0; }
            hr { 
              border: 0; 
              border-top: 2px solid #444; 
              margin: 2em 0;
            }
          `,
          
          images_upload_handler: handleUpload,
          automatic_uploads: true,
          file_picker_types: 'image media',
          image_caption: true,
          image_advtab: true,
          image_title: true,
          image_dimensions: true,
          
          media_live_embeds: true,
          media_alt_source: true,
          media_poster: true,
          
          table_default_attributes: { border: '1', cellspacing: '0', cellpadding: '8' },
          table_default_styles: { width: '100%', borderCollapse: 'collapse' },
          table_resize_bars: true,
          table_toolbar: 'tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol | tablecellmerge tablecellprops',
          
          relative_urls: false,
          remove_script_host: false,
          convert_urls: true,
          
          spellchecker_language: 'en',
          spellchecker_languages: 'English=en, Hindi=hi, Spanish=es, French=fr, German=de',
          
          placeholder: placeholder,
          statusbar: true,
          resize: 'both',
          branding: true,
          
          advlist_number_styles: 'lower-alpha,lower-roman,upper-alpha,upper-roman',
          advlist_bullet_styles: 'circle,square,disc',
          
          setup: (editor) => {
            editor.on('click', (e) => {
              if (e.target.nodeName === 'IMG') {
                editor.selection.select(e.target);
              }
            });
            
            editor.on('dblclick', (e) => {
              if (e.target.nodeName === 'IMG') {
                editor.execCommand('mceImage');
              }
            });
            
            editor.addShortcut('meta+b', 'Bold', () => editor.execCommand('Bold'));
            editor.addShortcut('meta+i', 'Italic', () => editor.execCommand('Italic'));
            editor.addShortcut('meta+u', 'Underline', () => editor.execCommand('Underline'));
            editor.addShortcut('meta+z', 'Undo', () => editor.execCommand('Undo'));
            editor.addShortcut('meta+shift+z', 'Redo', () => editor.execCommand('Redo'));
            editor.addShortcut('meta+k', 'Link', () => editor.execCommand('mceLink'));
          }
        }}
      />
    </div>
  );
};

export default RichTextEditor;