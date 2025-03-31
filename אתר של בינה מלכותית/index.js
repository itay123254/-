const express = require('express');
const ytDlp = require('yt-dlp');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// תיקייה בה נשמור את הקבצים המורדים
const downloadFolder = path.join(__dirname, 'downloads');
if (!fs.existsSync(downloadFolder)) {
    fs.mkdirSync(downloadFolder);
}

// API להורדת אודיו מ-YouTube
app.get('/download', (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).send('נא להזין קישור לשיר.');
    }

    const ydlOpts = {
        format: 'bestaudio',
        outtmpl: path.join(downloadFolder, '%(title)s.%(ext)s'),
    };

    ytDlp.exec([url], ydlOpts)
        .then(output => {
            res.send('הקובץ הורד בהצלחה!');
        })
        .catch(err => {
            res.status(500).send('שגיאה בהורדת הקובץ');
            console.error(err);
        });
});

// הפעלת השרת
app.listen(port, () => {
    console.log(`השרת פועל על http://localhost:${port}`);
});
