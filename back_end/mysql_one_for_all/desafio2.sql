SELECT COUNT(c.id) AS cancoes, COUNT(DISTINCT a.id_artista) AS artistas, COUNT(DISTINCT a.id) AS albuns
	FROM SpotifyClone.Musicas AS c
    INNER JOIN SpotifyClone.Albuns AS a
    ON c.id_album = a.id;