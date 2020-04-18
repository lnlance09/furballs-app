import { Audio } from "expo-av"

export const playSound = async file => {
	try {
		const { sound: soundObject, status } = await Audio.Sound.createAsync(file, {
			shouldPlay: true
		})
	} catch (error) {
		console.log(error)
	}
}
