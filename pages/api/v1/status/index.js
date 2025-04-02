function status(request, response) {
  response.status(200).json({ chave: "De volta pra dentro da canção" });
}

export default status;
