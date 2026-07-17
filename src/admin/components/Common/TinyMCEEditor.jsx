import React, { useEffect, useRef, useState } from 'react';

const API_BASE_URL = '';
const tinyMceApiKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY;

let tinyMceLoader = null;

const loadTinyMce = () => {
  if (typeof window === 'undefined') return Promise.reject(new Error('TinyMCE can only load in the browser.'));
  if (window.tinymce) return Promise.resolve(window.tinymce);
  if (!tinyMceApiKey) return Promise.reject(new Error('TinyMCE API key is not configured.'));

  if (!tinyMceLoader) {
    tinyMceLoader = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://cdn.tiny.cloud/1/${tinyMceApiKey}/tinymce/7/tinymce.min.js`;
      script.referrerPolicy = 'origin';
      script.onload = () => resolve(window.tinymce);
      script.onerror = () => reject(new Error('TinyMCE failed to load.'));
      document.head.appendChild(script);
    });
  }

  return tinyMceLoader;
};

const uploadImage = async (blobInfo) => {
  const formData = new FormData();
  formData.append('courseImage', blobInfo.blob(), blobInfo.filename());

  const token = localStorage.getItem('adminToken');
  const response = await fetch(`${API_BASE_URL}/api/upload/course-image`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Image upload failed.');
  }

  return data.imagePath?.startsWith('http') ? data.imagePath : `${API_BASE_URL}${data.imagePath}`;
};

const TinyMCEEditor = ({
  value = '',
  onChange,
  placeholder = 'Write content...',
  minHeight = 320,
  className = '',
}) => {
  const textareaRef = useRef(null);
  const editorRef = useRef(null);
  const lastValueRef = useRef(value || '');
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let isMounted = true;

    loadTinyMce()
      .then((tinymce) => tinymce.init({
        target: textareaRef.current,
        height: minHeight,
        menubar: false,
        branding: false,
        promotion: false,
        placeholder,
        skin: 'oxide-dark',
        content_css: 'dark',
        plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount',
        toolbar: 'undo redo | blocks fontsize | bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table | removeformat code fullscreen',
        images_upload_handler: uploadImage,
        automatic_uploads: true,
        file_picker_types: 'image',
        setup: (editor) => {
          editorRef.current = editor;
          editor.on('init', () => {
            editor.setContent(lastValueRef.current || '');
          });
          editor.on('change keyup undo redo setcontent', () => {
            const content = editor.getContent();
            lastValueRef.current = content;
            onChange?.(content);
          });
        },
        content_style: `
          body { background: #000; color: #fff; font-family: Inter, Arial, sans-serif; font-size: 15px; line-height: 1.6; }
          a { color: #00B7B3; }
          blockquote { border-left: 4px solid #00B7B3; margin-left: 0; padding-left: 16px; color: #d1d5db; }
          img { max-width: 100%; height: auto; border-radius: 8px; }
        `,
      }))
      .catch((error) => {
        if (isMounted) setLoadError(error.message);
      });

    return () => {
      isMounted = false;
      if (editorRef.current) {
        editorRef.current.remove();
        editorRef.current = null;
      }
    };
  }, [minHeight, onChange, placeholder]);

  useEffect(() => {
    if (value === lastValueRef.current) return;
    lastValueRef.current = value || '';
    if (editorRef.current && editorRef.current.initialized) {
      editorRef.current.setContent(lastValueRef.current);
    }
  }, [value]);

  if (!tinyMceApiKey || loadError) {
    return (
      <div className={className}>
        <textarea
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          placeholder={placeholder}
          rows={8}
          className="w-full rounded-lg border border-gray-700 bg-black/60 px-4 py-3 text-white outline-none focus:border-[#00B7B3]"
        />
        <p className="mt-2 text-xs text-amber-300">
          {loadError || 'TinyMCE API key is missing. Add NEXT_PUBLIC_TINYMCE_API_KEY to your frontend .env file.'}
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <textarea ref={textareaRef} defaultValue={value} />
    </div>
  );
};

export default TinyMCEEditor;
