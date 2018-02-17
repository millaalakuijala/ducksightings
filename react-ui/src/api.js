export const loadSightings = async () => {
	const response = await fetch('/sightings')
	const sightings = await response.json()
	if (response.status !== 200) {
		throw Error(sightings.message)
	}
    return sightings
}

export const addSighting = async (species, description, dateTime, count) => {
	const response = await fetch('/sightings', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ species, description, dateTime, count })
	})
	if (response.status !== 200) {
		throw Error(response)
	}
    return 'Adding succeeded.'
}

export const loadSpecies = async (speciesName) => {
	const response = await fetch('/species')
	const species = await response.json()
	if (response.status !== 200) {
		throw Error(species.message)
	}
	const speciesNames = species.map(species => species.name)
	return speciesNames

}