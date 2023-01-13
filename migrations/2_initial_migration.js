const NegocioFidelizado = artifacts.require("NegocioFidelizado");

module.exports = function(deployer) {
  deployer.deploy(NegocioFidelizado, "Tiendas Oxxo", "POXXO", 10000000);//100 MILL tokens
};

