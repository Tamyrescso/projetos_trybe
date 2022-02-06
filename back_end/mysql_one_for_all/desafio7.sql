SELECT
	artistas.artista AS artista,
	albuns.album AS album,
    COUNT(seguidoresT.id_artista) AS seguidores
		FROM SpotifyClone.Artistas AS artistas
		INNER JOIN SpotifyClone.Albuns AS albuns
			ON artistas.id = albuns.id_artista
		INNER JOIN SpotifyClone.Seguindo_Artistas AS seguidoresT
			ON seguidoresT.id_artista = artistas.id
	GROUP BY album, artista
    ORDER BY seguidores DESC, artista, album;