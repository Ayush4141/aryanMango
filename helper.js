const Accession_No = () => {
      const date = new Date();
      const year = date.getFullYear().toString();
      const month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
      const date1 = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let Accession_No = date1 + month + year + Math.floor(1000 + Math.random() * 9000);
      return Accession_No;

};

module.exports = { Accession_No };
