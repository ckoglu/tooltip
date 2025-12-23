// highlight.js
function initializeHighlighter() {
    // Dil tanımlamaları
    const languages = {
        html: {
            name: 'HTML',
            patterns: [
                {
                    regex: /(&lt;\/?)([a-zA-Z][a-zA-Z0-9\-]*)(?:\s|&gt;)/g,
                    class: 'token tag'
                },
                {
                    regex: /([a-zA-Z\-]+)=/g,
                    class: 'token attr-name'
                },
                {
                    regex: /"([^"]*)"|'([^']*)'/g,
                    class: 'token attr-value'
                },
                {
                    regex: /(&lt;\/?|&gt;)/g,
                    class: 'token punctuation'
                },
                {
                    regex: /(&amp;)([a-zA-Z]+;)/g,
                    class: 'token entity'
                },
                {
                    regex: /(&lt;!--[\s\S]*?--&gt;)/g,
                    class: 'token comment'
                }
            ]
        },
        css: {
            name: 'CSS',
            patterns: [
                {
                    regex: /([a-zA-Z\-]+)(?=\s*:)/g,
                    class: 'token property'
                },
                {
                    regex: /(:)(?=\s*)/g,
                    class: 'token punctuation'
                },
                {
                    regex: /([a-zA-Z\-#\.\d]+)(?=\s*\{|;|,)/g,
                    class: 'token selector'
                },
                {
                    regex: /(#([a-fA-F0-9]{3,6})|rgb\(\d+,\s*\d+,\s*\d+\))/g,
                    class: 'token hexcode'
                },
                {
                    regex: /(\d+)(px|em|rem|%|vw|vh)/g,
                    class: 'token number'
                },
                {
                    regex: /(\/\*[\s\S]*?\*\/)/g,
                    class: 'token comment'
                }
            ]
        },
        js: {
            name: 'JavaScript',
            patterns: [
                {
                    regex: /\b(function|const|let|var|return|if|else|for|while|switch|case|break|continue|class|export|import)\b/g,
                    class: 'token keyword'
                },
                {
                    regex: /\b(true|false|null|undefined|this)\b/g,
                    class: 'token constant'
                },
                {
                    regex: /("[^"]*"|'[^']*'|`[^`]*`)/g,
                    class: 'token string'
                },
                {
                    regex: /\b(\d+)\b/g,
                    class: 'token number'
                },
                {
                    regex: /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
                    class: 'token comment'
                },
                {
                    regex: /([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*\()/g,
                    class: 'token function'
                }
            ]
        }
    };

    // HTML entity'leri dönüştür
    function decodeHtmlEntities(text) {
        const entities = {
            '&lt;': '<',
            '&gt;': '>',
            '&amp;': '&',
            '&quot;': '"',
            '&#39;': "'"
        };
        return text.replace(/&[a-z]+;|&#\d+;/g, match => entities[match] || match);
    }

    // Highlight uygula
    function highlightCode(code, language) {
        if (!languages[language]) return code;
        
        let highlighted = code;
        const lang = languages[language];
        
        lang.patterns.forEach(pattern => {
            highlighted = highlighted.replace(pattern.regex, (match, ...groups) => {
                // Grupları filtrele
                const fullMatch = groups[0] || match;
                return `<span class="${pattern.class}">${match}</span>`;
            });
        });
        
        return highlighted;
    }

    // Tüm code elementlerini bul ve highlight et
    function highlightAll() {
        document.querySelectorAll('pre code').forEach(codeElement => {
            // Language tespit et
            let language = 'html';
            const parentPre = codeElement.parentElement;
            
            if (parentPre.className.includes('language-')) {
                const match = parentPre.className.match(/language-(\w+)/);
                if (match) language = match[1];
            } else if (codeElement.className.includes('language-')) {
                const match = codeElement.className.match(/language-(\w+)/);
                if (match) language = match[1];
            } else {
                // İçeriğe göre otomatik tespit
                const content = codeElement.textContent;
                if (content.includes('function') || content.includes('const') || content.includes('let')) {
                    language = 'js';
                } else if (content.includes('{') && content.includes(':') && content.includes('}')) {
                    language = 'css';
                }
            }
            
            // HTML entity'leri decode et
            let content = codeElement.innerHTML;
            content = decodeHtmlEntities(content);
            
            // Highlight uygula
            const highlighted = highlightCode(content, language);
            
            // Orjinal content'i sakla
            codeElement.setAttribute('data-original', content);
            
            // Highlight edilmiş içeriği ekle
            codeElement.innerHTML = highlighted;
            
            // Language class'ını ekle
            codeElement.classList.add('language-' + language);
        });
    }

    // Sayfa yüklendiğinde highlight et
    document.addEventListener('DOMContentLoaded', highlightAll);
    
    // Dinamik olarak eklenen kodlar için MutationObserver
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && (node.tagName === 'CODE' || node.querySelector('code'))) {
                        setTimeout(highlightAll, 10);
                    }
                });
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    return {
        highlightAll,
        highlightCode,
        languages
    };
}

// Global kullanım için
if (typeof window !== 'undefined') {
    window.highlightJS = initializeHighlighter();
}
