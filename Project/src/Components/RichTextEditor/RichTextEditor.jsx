import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'
// Editor is an uncontrolled React component
const RichTextEditor = forwardRef(
  ({ readOnly, initialHtml, onTextChange}, ref) => {
    const containerRef = useRef(null);
    const onTextChangeRef = useRef(onTextChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
    });

    useEffect(() => {
      ref.current?.enable(!readOnly);
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement('div'),
      );
      const quill = new Quill(editorContainer, {
        theme: 'snow',
        modules:{
          toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ]
        }
      });

      ref.current = quill;

      if (initialHtml) {
        quill.clipboard.dangerouslyPasteHTML(initialHtml);
      }

      quill.on(Quill.events.TEXT_CHANGE, () => {
        const semanticHtml = quill.root.innerHTML;
        onTextChangeRef.current?.(semanticHtml);
      });

      return () => {
        ref.current = null;
        container.innerHTML = '';
      };
    }, [ref]);

    return <div ref={containerRef}></div>;
  },
);

RichTextEditor.displayName = 'Editor';

export default RichTextEditor;