if ('loading' in HTMLImageElement.prototype) {
  addSrcAttrToLazyImg();
} else {
  addLazySizesScript();
}

function addLazySizesScript() {
  const script = document.createElement('script');
  script.src =
    'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.2/lazysizes.min.js';
  script.integrity =
    'sha512-TmDwFLhg3UA4ZG0Eb4MIyT1O1Mb+Oww5kFG0uHqXsdbyZz9DcvYQhKpGgNkamAI6h2lGGZq2X8ftOJvF/XjTUg==';
  script.crossorigin = 'anonymous';

  DocumentTimeline.body.appendChild(script);
}

function addSrcAttrToLazyImg() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
}
