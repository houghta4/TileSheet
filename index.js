let formData = {
    sheetSizeX: "0",
    sheetSizeY: "0",
    spriteSizeX: "0",
    spriteSizeY: "0",
    totalRows: "0",
    totalCols: "0"
};

// Need to check everything is filled out
const onFormSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    formData = Object.fromEntries(data.entries());
    formData.totalRows = (+formData.sheetSizeX / +formData.spriteSizeX).toString();
    formData.totalCols = (+formData.sheetSizeY / +formData.spriteSizeY).toString();
    console.log(formData);
    document.querySelector('#content').style.width = `${formData.sheetSizeX}px`;
    document.querySelector('#content').style.height = `${formData.sheetSizeY}px`;


}

const onFileSelect = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = readerEvent => {
        const content = readerEvent.target.result;
        document.querySelector('#content').style.backgroundImage = 'url(' + content + ')';
    };
}

const onClickTile = (e) => {
    e.preventDefault();
    let results = document.getElementById("results");
    let tile = document.createElement("div");
    let row = Math.floor(e.pageY / +formData.spriteSizeY);
    let col = Math.floor(e.pageX / +formData.spriteSizeX);
    let idx = row * +formData.totalRows + col;
    tile.innerHTML = `(row, col): ((${row}, ${col}) idx: ${idx}`;
    results.appendChild(tile);
}

const onMouseOverTile = (e) => {
    e.preventDefault();
    if (!formData)
        return;
    let content = document.getElementById("content");
    let row = Math.floor(e.pageY / +formData.spriteSizeY);
    let col = Math.floor(e.pageX / +formData.spriteSizeX);
    let idx = row * +formData.totalRows + col;
    content.title = `idx: ${idx}`;

}

window.onload = function (_e) {

    const form = document.getElementById("img-details");
    const content = document.getElementById("content");
    const file = document.getElementById("file-select");
    
    form.addEventListener("submit", onFormSubmit);
    file.addEventListener("change", onFileSelect);
    content.addEventListener("click", onClickTile);
    content.addEventListener("mousemove", onMouseOverTile);

}