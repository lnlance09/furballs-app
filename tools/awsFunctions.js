import Storage from "@aws-amplify/storage"
// import Amplify, { Auth } from "aws-amplify"
// import config from "../../aws-exports"
// Amplify.configure(config)

export const addToS3 = async ({ contentType, fileName, img }) => {
	const imageData = await fetch(img.uri)
	const blobData = await imageData.blob()

	try {
		await Storage.put(fileName, blobData, {
			contentType,
			level: "public",
			progressCallback(progress) {
				console.log(`Uploaded: ${progress.loaded}/${progress.total}`)
			}
		})
	} catch (err) {
		console.log("error: ", err)
	}
}
