import { StyleSheet, Text } from "react-native"
import { Image, Pressable, View } from "react-native"

const avatarImg = "https://avatars.githubusercontent.com/u/76624955?v=4"

function ProfileAvatarCard() {
    return (
        <View style={s.box}>
            <Pressable>
                <Image source={{
                    uri: avatarImg
                }} style={s.coverImg} />
            </Pressable>
            <View>
            <Text style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: '#17171780'
            }}>Victor Santos</Text>
            <Text style={{
                fontSize: 11,
                fontWeight: 'bold',
                color: '#171717'
            }}>Bodegero</Text>
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16,
        columnGap: 7
    },
    coverImg: {
        width: 40,
        height: 40,
        borderRadius: 10,
    }

})

export default ProfileAvatarCard