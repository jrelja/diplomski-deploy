

export const getOglasi = async () => {
    try {
      const response = await fetch("https://diplomski-api.vercel.app/api/v1/oglasi/prikazoglasi");
      var jsonData = await response.json();
      jsonData = jsonData.data;
      return jsonData;
    } catch (err) {
      console.error(err.message);
      return [];
    }
  };