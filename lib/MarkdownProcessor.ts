import markdownit from 'markdown-it';
import hljs from 'highlight.js'

export const MarkdownProcessor = {
    _processor: markdownit({
        html: true,
        // highlight pulled from https://github.com/markdown-it/markdown-it#syntax-highlighting
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
              try {
                return hljs.highlight(str, { language: lang }).value;
              } catch (__) {}
            }
            return ''; // use external default escaping,
        }
    }),
    process(content: string): string {
        return this._processor.render(content);
    },
}