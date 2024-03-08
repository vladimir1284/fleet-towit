export const formatEntity = (value) => {
  if (typeof value !== 'object' || Array.isArray(value)) throw new Error('Not an entity')

  const keys = Object.keys(value)

  const formattedEntity = keys.map(key => {
    const entry = { key }

    if (Array.isArray(value[key])) {
      entry.value = formatCollection(value[key])
      entry.type = 'collection'
    } else if (typeof value[key] === 'object') {
      entry.value = formatEntity(value[key])
      entry.type = 'entity'
    } else {
      entry.value = value[key]
      entry.type = 'literal'
    }

    return entry
  })

  return formattedEntity
}

export const formatCollection = (value) => {
  if (!Array.isArray(value)) throw new Error('Not a collection')

  const formattedArray = value.map(entry => {
    let formattedEntry

    if (Array.isArray(entry)) {
      formattedEntry = formatCollection(value)
    } else if (typeof entry === 'object') {
      formattedEntry = formatEntity(entry)
    } else {
      formattedEntry = entry
    }

    return formattedEntry
  })

  return formattedArray
}

export const formatData = (data) => {
  let formattedData

  if (Array.isArray(data)) {
    formattedData = formatCollection(data)
  } else if (typeof data === 'object') {
    formattedData = formatEntity(data)
  } else {
    formattedData = data
  }

  return formattedData
}

export const iconifyData = (formatedData, iconsDict) => {
  return formatedData.map(element => element.map(entry => {
    const iconifiedEntry = {
      ...entry,
    }

    if (['entity', 'collection'].includes(entry.type)) {
      iconifiedEntry.icon = '*' //iconsDict[entry.key]

      if (entry.type === 'collection') {
        iconifiedEntry.value = iconifyData(entry.value, iconsDict)
      }
    }

    return iconifiedEntry
  }))
}