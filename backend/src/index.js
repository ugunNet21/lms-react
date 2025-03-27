const express = require('express')
const app = express()
const port = 3000

// Middleware untuk mengaktifkan parsing JSON
app.use(express.json())

// Data dummy
const data = [
  { id: 1, nama: 'John Doe', umur: 30 },
  { id: 2, nama: 'Jane Doe', umur: 25 },
  { id: 3, nama: 'Bob Smith', umur: 40 }
]

// Endpoint untuk mengembalikan semua data
app.get('/data', (req, res) => {
  res.json(data)
})

// Endpoint untuk mengembalikan data berdasarkan ID
app.get('/data/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const dataFound = data.find((item) => item.id === id)
  if (dataFound) {
    res.json(dataFound)
  } else {
    res.status(404).json({ message: 'Data tidak ditemukan' })
  }
})

// Endpoint untuk menambahkan data baru
app.post('/data', (req, res) => {
  const { nama, umur } = req.body
  if (!nama || !umur) {
    res.status(400).json({ message: 'Nama dan umur harus diisi' })
  } else {
    const newData = { id: data.length + 1, nama, umur }
    data.push(newData)
    res.json(newData)
  }
})

// Endpoint untuk mengupdate data
app.put('/data/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const dataFound = data.find((item) => item.id === id)
  if (dataFound) {
    const { nama, umur } = req.body
    if (nama) dataFound.nama = nama
    if (umur) dataFound.umur = umur
    res.json(dataFound)
  } else {
    res.status(404).json({ message: 'Data tidak ditemukan' })
  }
})

// Endpoint untuk menghapus data
app.delete('/data/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const dataFound = data.find((item) => item.id === id)
  if (dataFound) {
    data.splice(data.indexOf(dataFound), 1)
    res.json({ message: 'Data berhasil dihapus' })
  } else {
    res.status(404).json({ message: 'Data tidak ditemukan' })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})