export default async function getResources(url) {
    try {
        const response = await fetch(url)
        return await response.json()
    } catch (e) {
        console.log("Error => ", e)
    } finally {
        console.log("Finally getResources()")
    }
}