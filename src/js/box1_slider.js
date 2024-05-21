document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll('.box1 .image');
    const totalImages = images.length;
    let currentIndex = 0;

    // 动态设置每张图片的宽度和父容器的宽度
    document.querySelector('.box1 .image-content').style.width = `${totalImages * 100}%`;
    images.forEach(img => {
        img.style.width = `${100 / totalImages}%`;
        img.style.opacity = 0;
    });

    function showImage(index) {
        images.forEach(img => {
            img.style.opacity = 0;
        });
        
        images[index].style.opacity = 1;
        const offset = index * -100 / totalImages;
        document.querySelector('.box1 .image-content').style.transform = `translateX(${offset}%)`;
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        showImage(currentIndex);
    }

    setInterval(nextImage, 3000); // 每 3 秒切换到下一张图片
    showImage(currentIndex); // 显示第一张图片
});
