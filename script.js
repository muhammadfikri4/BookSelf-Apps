const bookDatas = 'book-datas';
const judul = document.getElementById('judul')
const penulis = document.getElementById('penulis')
const tahun = document.getElementById('tahun')
const tambahBuku = document.getElementById('tambah');
const check = document.getElementById('complete');
const listUncompleteBox = document.querySelector('.list-uncomplete-box');
const listCompleteBox = document.querySelector('.list-complete-box');


const generatedId = () => {
    return +new Date();
}



tambahBuku.addEventListener('click', function(e) {
    
    let isComplete;

if(check.checked) {
    isComplete = true
} else {
    isComplete = false;
}
    const dataBook = {
        id: generatedId(),
        title: judul.value,
        author: penulis.value,
        year: Number(tahun.value),
        isComplete
    }

    const data = JSON.parse(localStorage.getItem(bookDatas)) || [];
    data.push(dataBook)
    localStorage.setItem(bookDatas, JSON.stringify(data));
});

const findByComplete = (bool) => {
    const data = JSON.parse(localStorage.getItem(bookDatas));
    if(data) {
        const search = data.filter((item) => {
            return item.isComplete === bool;
        });
        return search;
    }
}


const showDataUncomplete = (item) => {
    return `<div class="item-uncomplete">
    <h3>${item.title}</h3>
    <p>Penulis : ${item.author}</p>
    <p>Tahun : ${item.year}</p>
    <div class="optional">
      <button class="selesai" id-selesai=${item.id}>Selesai</button>
      <button class="hapus" id-hapus=${item.id}>Hapus</button>
    </div>
  </div>`
}

const renderDataUnComplete = () => {
    const dataUnComplete = findByComplete(false);
    let dataCard = ''
    dataUnComplete.forEach((e) => {
        dataCard += showDataUncomplete(e)
    })
    listUncompleteBox.innerHTML = dataCard
}


renderDataUnComplete();
const selesai = document.querySelectorAll('.selesai');

const findById = (id, bool) => {
    const dataBook = findByComplete(bool).find((item) => {
        return item.id == id;
    });
    return dataBook;
}
if(selesai) {
    selesai.forEach((btn, i) => {
        btn.addEventListener('click', function() {
            const id = btn.getAttribute('id-selesai');
            const data = JSON.parse(localStorage.getItem(bookDatas));
            const index = data.findIndex((item) => {
                return item.id == id
            })
            
            const newDataBook ={ ...findById(id, false)};
            console.log(newDataBook)
            newDataBook.isComplete = true;
            data.splice(index, 1, newDataBook);
            localStorage.setItem(bookDatas, JSON.stringify(data));
            location.reload()
        })
        
    })
}


// Selesai dibaca

const showDataComplete = (item) => {
    return `<div class="item-uncomplete">
    <h3>${item.title}</h3>
    <p>Penulis : ${item.author}</p>
    <p>Tahun : ${item.year}</p>
    <div class="optional">
      <button class="belum-selesai" id-selesai=${item.id}>Belum Selesai</button>
      <button class="hapus" id-hapus=${item.id}>Hapus</button>
    </div>
  </div>`
}

const renderDataComplete = () => {
    const dataComplete = findByComplete(true);
    let dataCard = ''
    dataComplete.forEach((e) => {
        dataCard += showDataComplete(e)
    })
    listCompleteBox.innerHTML = dataCard;
}

renderDataComplete();
const belumSelesai = document.querySelectorAll('.belum-selesai');

if(belumSelesai) {
    belumSelesai.forEach((btn, i) => {
        btn.addEventListener('click', function() {
            const id = btn.getAttribute('id-selesai');
            const data = JSON.parse(localStorage.getItem(bookDatas));
            const index = data.findIndex((item) => {
                return item.id == id
            })
            
            const newDataBook ={ ...findById(id, true)};
            newDataBook.isComplete = false;
            data.splice(index, 1, newDataBook);
            localStorage.setItem(bookDatas, JSON.stringify(data));
            location.reload()
        })
        
    })
}

const hapus = document.querySelectorAll('.hapus');

if(hapus) {
    hapus.forEach((btn, i) => {
        btn.addEventListener('click', function() {
            const id = btn.getAttribute('id-hapus');
            const data = JSON.parse(localStorage.getItem(bookDatas));
            const index = data.findIndex((item) => {
                return item.id == id
            })
            
            data.splice(index, 1);
            localStorage.setItem(bookDatas, JSON.stringify(data));
            location.reload()
        })
        
    })
}