SELECT
	artistas.artista AS artista,
	albuns.album AS album
		FROM SpotifyClone.Artistas AS artistas
		INNER JOIN SpotifyClone.Albuns AS albuns
			ON artistas.id = albuns.id_artista
	    WHERE artista = 'Walter Phoenix';