let formData = {
    sheetSizeX: "0",
    sheetSizeY: "0",
    spriteSizeX: "0",
    spriteSizeY: "0",
    totalRows: "0",
    totalCols: "0",
};

let bgImg = "";

// Need to check everything is filled out
const onFormSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    formData = Object.fromEntries(data.entries());
    formData.totalRows = (+formData.sheetSizeX / +formData.spriteSizeX).toString();
    formData.totalCols = (+formData.sheetSizeY / +formData.spriteSizeY).toString();
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
        bgImg = content;
        document.querySelector('#content').style.backgroundImage = 'url(' + bgImg + ')';
    };
}

const onClickTile = (e) => {
    e.preventDefault();
    console.log(formData);
    let results = document.getElementById("results");
    let entry = document.createElement("div");
    let tileWrapper =document.createElement("div");
    let tile = document.createElement("div");
    let tileDetails = document.createElement("div");
    const row = Math.floor(e.pageY / +formData.spriteSizeY);
    const col = Math.floor(e.pageX / +formData.spriteSizeX);
    const idx = row * +formData.totalRows + col;

    tileWrapper.classList.add("checker-bg");

    tileDetails.innerHTML = `(row, col): ((${row}, ${col}) idx: ${idx}`;

    tile.style.backgroundImage = 'url(' + bgImg + ')';
    tile.style.backgroundColor = 'red';
    tile.style.background = `no-repeat -${col * +formData.spriteSizeX}px -${row * +formData.spriteSizeY}px url(${bgImg})`
    tile.style.width = `${formData.spriteSizeX}px`;
    tile.style.height = `${formData.spriteSizeY}px`;
    tile.style.overflow = 'hidden';

    entry.classList.add("flex-wrapper");

    tileWrapper.appendChild(tile);
    entry.appendChild(tileWrapper);
    entry.appendChild(tileDetails);
    results.appendChild(entry);
}

const onMouseOverTile = (e) => {
    e.preventDefault();
    let content = document.getElementById("content");
    const row = Math.floor(e.pageY / +formData.spriteSizeY);
    const col = Math.floor(e.pageX / +formData.spriteSizeX);
    const idx = row * +formData.totalRows + col;
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