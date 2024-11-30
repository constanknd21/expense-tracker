# Menggunakan image Node.js sebagai base image
FROM node:16

# Mengatur direktori kerja di dalam container
WORKDIR /app

# Menyalin package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Menginstal dependencies
RUN npm install

# Menyalin semua file dari direktori lokal ke dalam container
COPY . .

# Mengekspos port yang digunakan oleh aplikasi
EXPOSE 3000

# Menjalankan aplikasi
CMD ["node", "server.js"]
