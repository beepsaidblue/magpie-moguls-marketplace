import { CandyShop } from "@liqnft/candy-shop-sdk";
import { Orders, Stat } from "@liqnft/candy-shop";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Cluster } from "@solana/web3.js";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import styled from "styled-components";
import { useCurrency } from "../components/Currency";
import { useEffect, useState } from "react";

const CANDY_SHOP_CREATOR_ADDRESS = new PublicKey(
  process.env.REACT_APP_CANDY_SHOP_CREATOR_ADDRESS!
);
const CANDY_SHOP_PROGRAM_ID = new PublicKey(
  process.env.REACT_APP_CANDY_SHOP_PROGRAM_ID!
);
const NETWORK = process.env.REACT_APP_SOLANA_NETWORK! as Cluster;

const DesContainer = styled.div`
  width: 100%;
`;

const MultiCurrencyMarketplace: React.FC = () => {
  const wallet = useAnchorWallet();
  const { getCurrencySettings } = useCurrency();
  const settings = getCurrencySettings();

  const [candyShop, setCandyShop] = useState<CandyShop>();

  console.log("Currency Settings", settings);

  useEffect(() => {
    setCandyShop(
      new CandyShop(
        CANDY_SHOP_CREATOR_ADDRESS,
        new PublicKey(settings.treasuryMint),
        CANDY_SHOP_PROGRAM_ID,
        NETWORK,
        settings
      )
    );
  }, [settings]);

  if (!candyShop) {
    return <></>;
  }

  // if NEST shop, show all identifiers
  let filters = [
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

  // if SOL shop, only show magpies
  if (settings.currencySymbol === 'SOL') {
    filters = [
      { name: 'Magpie Moguls', identifier: -1449267971 },
    ]
  }

  return (
    <DesContainer>
      <div style={{ marginBottom: 50 }}>
        <img src="/banner.jpeg" alt="Magpie Moguls" width="100%" />
      </div>
      <Stat
        candyShop={candyShop}
        title={"Marketplace"}
        description={
          "Buy & sell Magpies and shiny things in NEST and SOL!"
        }
        style={{ paddingBottom: 50 }}
      />
      <Orders
        wallet={wallet}
        candyShop={candyShop}
        walletConnectComponent={<WalletMultiButton />}
        filters={filters}
      />
    </DesContainer>
  );
};

export default MultiCurrencyMarketplace;
