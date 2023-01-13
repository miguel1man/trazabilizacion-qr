// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;
import "./ERC20.sol";

// Contrato autogestionable por fidelizame
contract NegocioFidelizado is ERC20 {
    // Direcciones iniciales
    address private _addMaestro;
    address private _addNegocio;
    string private _NombreDelNegocio;
    uint256 private _totalSupply;

    // Constructor del Smart Contract
    constructor(// Oxxo POXXO 100000
        string memory name_,
        string memory symbol_,
        uint256 totalSupply_
    ) ERC20(name_, symbol_, totalSupply_, msg.sender) {
        _addNegocio = address(this);
        _NombreDelNegocio = name_;
        _totalSupply = totalSupply_;
        _addMaestro = msg.sender;
    }

    // Get Variables
    function addMaestro() public view virtual returns (address) {
        return _addMaestro;
    }

    function addNegocio() public view virtual returns (address) {
        return _addNegocio;
    }

    //--------------------------------------------------SUPPLY----------------------------------------

    // Costo por TOKENS
    // Por cada 10k tokens se pagará 0.5 BNB
    function CalculeCostoTokens(uint256 numTokens)
        public
        pure
        returns (uint256)
    {
        return (5000000000000000000 * numTokens) / (10000000);
        // return (5000 * numTokens) / (100000);
    }

    // Creacion de nuevos Tokens

    function crearTokens(uint256 numTokens)
        public
        payable
        UnicamenteaddMaestro(msg.sender)
    {
        // Mayor a 10 tokens
        // require(numTokens >= 10000);
        require(msg.value == CalculeCostoTokens(numTokens));
        _mint(msg.sender, numTokens);
    }

    //--------------------------------------------------BASE DE DATOS---------------------------------
    struct usuarios {
        string tienda;
        uint256 num_usos;
        bool operativo;
        //data extra
    }

    struct cajero {
        string tienda;
        uint256 users_atendidos;
        bool operativo;
        //data extra
    }

    mapping(address => usuarios) private _usuarios;
    mapping(address => cajero) private _cajeros;

    //--------------------------------------------------EVENTOS----------------------------------------
    event NuevoCajero(address);

    //--------------------------------------------------MODIFICADORES----------------------------------------

    // Modificador para hacer funciones solamente accesibles por el owner del contrato
    modifier UnicamenteCajero(address _direccion) {
        require(
            _cajeros[_direccion].operativo == false,
            "Solo cajeros pueden realizar la operacion."
        );

        _;
    }

    modifier UnicamenteaddMaestro(address _direccion) {
        require(
            _direccion == _addMaestro,
            "Solo el Maestro puede realizar la operacion."
        );
        _;
    }

    //--------------------------------------------------FUNCIONES----------------------------------------
    // Asignar Cajeros
    function _AsigarCajero(address _addCajero)
        public
        UnicamenteaddMaestro(msg.sender)
    {
        _cajeros[_addCajero] = cajero(_NombreDelNegocio, 0, true);
        transfer(_addCajero, 100000);
    }

    // Saldo de Puntos 
    function SaldoGeneral(address address_) public view returns (uint256) {
        return balanceOf(address_);
    }

    function transferTokens(address _addCajero, uint amount)
        public
    {
        transfer(_addCajero, amount*100);
    }
}
