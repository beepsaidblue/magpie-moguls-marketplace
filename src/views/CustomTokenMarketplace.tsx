import { useRef } from 'react'
import { CandyShop } from '@liqnft/candy-shop-sdk'
import { Orders, Stat } from '@liqnft/candy-shop'
import { useAnchorWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Cluster } from '@solana/web3.js'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import styled from 'styled-components'

const CANDY_SHOP_CREATOR_ADDRESS = new PublicKey(process.env.REACT_APP_CANDY_SHOP_CREATOR_ADDRESS!)
const CANDY_SHOP_TREASURY_MINT = new PublicKey(process.env.REACT_APP_CANDY_SHOP_TREASURY_MINT!)
const CANDY_SHOP_PROGRAM_ID = new PublicKey(process.env.REACT_APP_CANDY_SHOP_PROGRAM_ID!)
const NETWORK = process.env.REACT_APP_SOLANA_NETWORK! as Cluster

const DesContainer = styled.div`
  width: 100%;
`

const CustomTokenMarketplace: React.FC = () => {
  const wallet = useAnchorWallet();

  const candyShopRef = useRef<CandyShop>(
    new CandyShop(
      CANDY_SHOP_CREATOR_ADDRESS,
      CANDY_SHOP_TREASURY_MINT,
      CANDY_SHOP_PROGRAM_ID,
      NETWORK,
      // pass additional settings param to configure shop display
      {
        currencySymbol: 'NEST',
        currencyDecimals: 6,
        priceDecimals: 0,
        volumeDecimals: 0
      }
    )
  )

  const filters = [
    { name: 'Bottle Caps', identifier: -2132972726 },
    // { name: 'Diamond Coin', identifier: 1038656921 },
    { name: 'Gold Coin', identifier: 361480341 },
    { name: 'Gold Watch', identifier: 992781383 },
    // { name: 'Golden Ticket #13', identifier: 1929271894 },
    { name: 'Golden Feather', identifier: 773099312},
    { name: 'Golden Ticket', identifier: 953453311 },
    { name: 'Magpie Moguls', identifier: -1449267971 },
    // { name: 'Mystery Box', identifier: -430461412 },
    { name: 'Silver Coin', identifier: 121963542 },
    { name: 'Story Books', identifier: -389143624 },
  ]

  return (
    <DesContainer>
      <div style={{ marginBottom: 50 }}>
        <img src="/banner.jpeg" alt="Magpie Moguls" width="100%" />
      </div>
      <Stat
        candyShop={candyShopRef.current}
        title={'Magpies Marketplace'}
        description={'Buy and sell Magpie Moguls with $NEST.'}
        style={{ paddingBottom: 50 }}
      />
      <Orders
        wallet={wallet}
        candyShop={candyShopRef.current}
        walletConnectComponent={<WalletMultiButton />}
        filters={filters}
      />
    </DesContainer>
  )
}

export default CustomTokenMarketplace
