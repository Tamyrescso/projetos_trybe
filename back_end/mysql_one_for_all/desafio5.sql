SELECT
	musicas.musica AS cancao,
	COUNT(historico.id_musica) AS reproducoes
		FROM SpotifyClone.Musicas AS musicas
		INNER JOIN SpotifyClone.Historico_Reproducao AS historico
			ON musicas.id = historico.id_musica
		GROUP BY cancao
        ORDER BY reproducoes DESC, cancao
        LIMIT 2;