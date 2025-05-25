function status(request, response) {
  response
    .status(200)
    .json({
      chave: "O site ta no ar, mas ainda em construição"
    });
}

export default status;
