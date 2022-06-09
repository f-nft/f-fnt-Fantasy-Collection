import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Body, Thead, Tbody} from @chakra-ui/react;

function STAKE() {

        <Flex>
            <Flex fontSize='25px', borderRadius: '14px', color: '#ffffff', fontWeight: '300', fontFamily: 'Black Ops One'>Fantasy NFT Staking Pool Active Rewards</Flex>
                <Table fontSize: '20px'>
                    <Thead className='Thead-light'>
                        <tr>
                            <th scope='col'>Collection</th>
                            <th scope='col'>Rewards Per Day</th>
                            <th scope='col'>Exchangeable Items</th>
                        </tr>
                    </Thead>
                    <Tbody style={{ fontSize: '18px' }}>
                        <tr>
                            <td>Discovery</td>
                            <td className='amount' data-test-id='rewards-summary-ads'>
                                <span className='amount'>0.50</span>&nbsp;<span class='currency'>FOT</span>
                            </td>
                            <td className='exchange'>
                                <span className='amount'>2</span>&nbsp;<span class='currency'>NFTs/M</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Angel & Devil</td>
                            <td className='amount' data-test-id='rewards-summary-ac'>
                                <span className='amount'>2.50</span>&nbsp;<span class='currency'>FOT</span>
                            </td>
                            <td className='exchange'><span class='amount'>10</span>&nbsp;<span class='currency'>NFTs/M</span>
                            </td>
                        </tr>
                        <tr className='stakegoldeffect'>
                            <td>Chaos</td>
                            <td className='amount' data-test-id='rewards-summary-one-time'><span class='amount'>1</span>&nbsp;<span class='currency'>FOT™</span>
                            </td>
                            <td className='exchange'>
                                <span className='amount'>25 NFTs/M or </span>
                                <span className='currency'>100 FOT/M</span>
                            </td>
                        </tr>
                    </Tbody>
                </Table>
                <div className='header'>
                    <div style={{ fontSize: '25px', borderRadius: '14px', fontWeight: '300', fontFamily: 'Black Ops One', color: 'white' }}>FOT Token Stake Farms</div>
                    <Table className='Table Table-bordered Table-dark' style={{ borderRadius: '14px' }} >
                        <Thead className='Thead-light' style={{ fontSize: '20px' }}>
                            <tr>
                                <th scope='col'>Farm Pools</th>
                                <th scope='col'>Harvest Daily Earnings</th>
                            </tr>
                        </Thead>
                        <Tbody style={{ fontSize: '18px' }}>
                            <tr>
                                <td>Stake FOT to Earn FOT</td>
                                <td className='amount' data-test-id='rewards-summary-ads'>
                                    <span className='amount'>0.01</span>&nbsp;<span class='currency'>Per FOT</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Stake FOT to Earn FOT™</td>
                                <td className='amount' data-test-id='rewards-summary-ac'>
                                    <span className='amount'>0.005</span>&nbsp;<span class='currency'>Per FOT™</span>
                                </td>
                            </tr>
                        </Tbody>
                    </Table>
                </div>
            </div>
        </Flex>
        
};

export default STAKE;