function status(request, response) {
  response.status(200).json({ chave: "Foge pra dentro da canção" });
}

export default status;
