const formatReleaseDate = (release_date: string) => {
    return (
        new Date(release_date || '1970-01-01').toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    )
}

export default formatReleaseDate;