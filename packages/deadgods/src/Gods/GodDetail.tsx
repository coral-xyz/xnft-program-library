import {
  usePublicKey,
  useConnection,
  View,
  Image,
  Text,
  Button,
  Tab,
  List,
  ListItem,
} from "react-xnft";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { BN } from "@project-serum/anchor";
import { THEME } from "../utils/theme";
import {
  gemFarmClient,
  gemBankClient,
  DEAD_FARM,
  DEAD_BANK,
  PID_GEM_BANK,
} from "../utils";

export function GodDetailScreen({ god }) {
  const publicKey = usePublicKey();
  const connection = useConnection();

  const stake = async () => {
    const farmClient = gemFarmClient();
    const bankClient = gemBankClient();

		const farm = DEAD_FARM;
		const bank = DEAD_BANK;
    const gemMint = new PublicKey(god.metadata.mint.toString());
    const gemSource = new PublicKey(god.publicKey.toString());

    const [farmer, bumpFarmer] = await PublicKey.findProgramAddress(
      [Buffer.from("farmer"), farm.toBuffer(), publicKey.toBuffer()],
      farmClient.programId
    );
    const [farmAuthority, bumpAuth] = await PublicKey.findProgramAddress(
      [farm.toBuffer()],
      farmClient.programId
    );
    const [vault, _vaultBump] = await PublicKey.findProgramAddress(
      [Buffer.from("vault"), bank.toBuffer(), publicKey.toBuffer()],
      PID_GEM_BANK
    );
    const [vaultAuthority, _vaultAuthorityBump] =
      await PublicKey.findProgramAddress([vault.toBuffer()], PID_GEM_BANK);
    const [gemBox, gemBoxBump] = await PublicKey.findProgramAddress(
      [Buffer.from("gem_box"), vault.toBuffer(), gemMint.toBuffer()],
      PID_GEM_BANK
    );
    const [gemDepositReceipt, gemDepositReceiptBump] =
      await PublicKey.findProgramAddress(
        [
          Buffer.from("gem_deposit_receipt"),
          vault.toBuffer(),
          gemMint.toBuffer(),
        ],
        PID_GEM_BANK
      );
		const [gemMetadata] = await PublicKey.findProgramAddress(
			[
				Buffer.from("metadata"),
				(new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')).toBuffer(),
				gemMint.toBuffer(),
			],
			PID_GEM_BANK,
		);
		const [mintWhitelistProof] = await PublicKey.findProgramAddress(
			[
				Buffer.from("whitelist"),
				bank.toBuffer(),
				gemMint.toBuffer(),
			],
			PID_GEM_BANK,
		);

    const amount = new BN(1);

    const tx = await bankClient.methods
      .depositGem(bumpAuth, gemBoxBump, gemDepositReceiptBump, amount)
      .accounts({
        bank,
        vault,
        owner: publicKey,
        authority: vaultAuthority,
        gemBox,
        gemDepositReceipt,
        gemSource,
        gemMint,
      })
      .remainingAccounts([
        // Mint whitelist proof.
        {
          pubkey: mintWhitelistProof,
          isSigner: false,
          isWritable: false,
        },
        // Gem metadata.
        {
          pubkey: gemMetadata,
          isSigner: false,
          isWritable: false,
        },
        // Creator whitelist proof.
        {
          pubkey: new PublicKey("3nnpV6qxLYSogWbePgxGFLPDgF8ao9zzCWoQgLoUwjnW"),
          isSigner: false,
          isWritable: false,
        },
      ])
      .postInstructions([
        await farmClient.methods
          .stake(bumpAuth, bumpFarmer)
          .accounts({
            farm,
            farmAuthority,
            farmer,
            identity: publicKey,
            bank,
            vault,
            gemBank: PID_GEM_BANK,
          })
          .instruction(),
      ])
      .transaction();

    const { blockhash } = await connection!.getLatestBlockhash("recent");
    tx.recentBlockhash = blockhash;

    const signature = await window.anchorUi.send(tx);
    console.log("tx signature", signature);
  };
  const unstake = async () => {
    const tx = new Transaction();
    tx.add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: publicKey,
        lamports: 1000000,
      })
    );
    console.log("plugin fetching most recent blockhash");
    const { blockhash } = await connection!.getLatestBlockhash("recent");
    console.log("plugin got recent blockhash", blockhash);
    tx.recentBlockhash = blockhash;
    const signature = await window.anchorUi.send(tx);
    console.log("test: got signed transaction here", signature);
  };

  return (
    <View
      style={{
        marginRight: "20px",
        marginLeft: "20px",
      }}
    >
      <Image
        style={{
          marginBottom: "24px",
          display: "block",
          borderRadius: "6px",
          width: "335px",
          height: "335px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        src={god.tokenMetaUriData.image}
      />
      <Text
        style={{
          color: THEME.colors.textSecondary,
        }}
      >
        Description
      </Text>
      <Text
        style={{
          color: THEME.colors.text,
          marginBottom: "10px",
        }}
      >
        {god.tokenMetaUriData.description}
      </Text>
      {god.isStaked ? (
        <Button
          style={{
            height: "48px",
            width: "335px",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "24px",
            marginBottom: "24px",
            backgroundColor: THEME.colors.unstake,
          }}
          onClick={() => unstake()}
        >
          Unstake
        </Button>
      ) : (
        <Button
          style={{
            height: "48px",
            width: "335px",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "24px",
            marginBottom: "24px",
            backgroundColor: THEME.colors.stake,
          }}
          onClick={() => stake()}
        >
          Stake
        </Button>
      )}
      <View>
        <Tab.Navigator
          options={({ route }) => {
            return {
              tabBarIcon: ({ focused }) => {
                switch (route.name) {
                  case "attributes":
                    return (
                      <Text
                        style={{
                          fontSize: "16px",
                          fontWeight: 500,
                          textAlign: "left",
                          color: THEME.colors.textSecondary,
                        }}
                      >
                        Attributes
                      </Text>
                    );
                  case "details":
                    return (
                      <Text
                        style={{
                          fontSize: "16px",
                          fontWeight: 500,
                          textAlign: "left",
                          color: THEME.colors.textSecondary,
                        }}
                      >
                        Details
                      </Text>
                    );
                  default:
                    throw new Error("unknown route");
                }
              },
              tabBarActiveTintColor: THEME.colors.text,
              tabBarInactiveTintColor: THEME.colors.attributeBackground,
            };
          }}
          style={{
            height: "34px",
            background: "transparent",
            borderTop: "none",
          }}
          disableScroll
          top
        >
          <Tab.Screen
            name="attributes"
            disableLabel={true}
            component={() => <AttributesTabScreen god={god} />}
          />
          <Tab.Screen
            name="details"
            disableLabel={true}
            component={() => <DetailsScreen god={god} />}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
}

function AttributesTabScreen({ god }) {
  return (
    <View
      style={{
        minHeight: "281px",
      }}
    >
      <View
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: "12px",
          marginLeft: "-4px",
          marginRight: "-4px",
        }}
      >
        {god.tokenMetaUriData.attributes.map((attr) => {
          return (
            <View
              style={{
                padding: "4px",
              }}
            >
              <View
                style={{
                  borderRadius: "8px",
                  backgroundColor: THEME.colors.attributeBackground,
                  paddingTop: "4px",
                  paddingBottom: "4px",
                  paddingLeft: "8px",
                  paddingRight: "8px",
                }}
              >
                <Text
                  style={{
                    color: THEME.colors.attributeTitle,
                    fontSize: "14px",
                  }}
                >
                  {attr.trait_type}
                </Text>
                <Text
                  style={{
                    color: THEME.colors.text,
                    fontSize: "16px",
                  }}
                >
                  {attr.value}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function DetailsScreen({ god }) {
  return (
    <View
      style={{
        marginTop: "12px",
        minHeight: "281px",
      }}
    >
      <List
        style={{
          backgroundColor: THEME.colors.attributeBackground,
        }}
      >
        <DetailListItem
          title={"Website"}
          value={god.tokenMetaUriData.external_url}
        />
        <DetailListItem
          title={"Artist royalties"}
          value={`${(
            god.metadata.data.sellerFeeBasisPoints / 100
          ).toString()}%`}
        />
        <DetailListItem
          title={"Mint address"}
          value={god.metadata.mint.toString()}
        />
        <DetailListItem
          title={"Token address"}
          value={god.publicKey.toString()}
        />
        <DetailListItem
          title={"Metadata address"}
          value={god.metadataAddress.toString()}
        />
        <DetailListItem
          title={"Update authority"}
          value={god.metadata.updateAuthority.toString()}
        />
      </List>
    </View>
  );
}

function DetailListItem({ title, value }) {
  return (
    <ListItem
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        padding: "12px",
      }}
    >
      <Text
        style={{
          color: THEME.colors.text,
          fontSize: "14px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: THEME.colors.textSecondary,
          fontSize: "14px",
          flexDirection: "column",
          justifyContent: "center",
          textOverflow: "ellipsis",
          width: "138px",
          overflow: "hidden",
          display: "block",
        }}
      >
        {value}
      </Text>
    </ListItem>
  );
}
