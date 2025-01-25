function copyToClipboard(button) {
    // 获取需要复制的文本
    const text = button.innerText;
    
    // 使用Clipboard API进行复制
    navigator.clipboard.writeText(text)
        // .then(() => {
        //     alert('文本已复制到剪贴板！'+text);
        // })
        .catch(err => {
            console.error('复制失败', err);
            alert('复制失败，请重试。');
        });
}