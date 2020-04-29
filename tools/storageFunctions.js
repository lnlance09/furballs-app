import { AsyncStorage } from "react-native"

export const deleteItemFromStorage = async item => {
	try {
		await AsyncStorage.removeItem(`${item}`)
	} catch (error) {
		console.error(error.message)
	}
}

export const getItemFromStorage = async () => {
	try {
		return await AsyncStorage.getItem("user")
	} catch (error) {
		console.error(error.message)
	}
}

export const saveItemToStorage = async (item, value) => {
	try {
		await AsyncStorage.setItem(`${item}`, value)
	} catch (error) {
		console.error(error.message)
	}
}