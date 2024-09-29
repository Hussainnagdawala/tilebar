export const useFileDownload = () => {
  const bufferToBlob = (buffer, mimeType) => {
    return new Blob([new Uint8Array(buffer)], { type: mimeType });
  };

  const downloadFile = (blob, fileName) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const getConvertedDownlaodCSV = (
    bufferData,
    fileName
  ) => {
    const mimeType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const blob = bufferToBlob(bufferData, mimeType);
    downloadFile(blob, fileName);
  };

  return {
    getConvertedDownlaodCSV,
    downloadFile
  };
};
