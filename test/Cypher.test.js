const CypherNFT = artifacts.require('./Cypher.sol')

contract('Cypher', (accounts) => {
  let contract;

  before(async () => {
    contract = await CypherNFT.deployed();
  });

  describe('deployment', async () => {
    it('contract deploy successfully', async () => {
      const address = contract.address

      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    });

    it('has a name', async () => {
      const name = await contract.name()
      assert.equal(name, 'Cypherpunk Nightmares');
    });

    it('has a symbol', async () => {
      const symbol = await contract.symbol()
      assert.equal(symbol, 'EVND');
    });
  });
})