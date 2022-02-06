SELECT
	usuarios.usuario AS usuario,
    COUNT(historico.id_usuario) AS qtde_musicas_ouvidas,
    ROUND((SUM(musicas.duracao_segundos)/60),2) AS total_minutos
		FROM SpotifyClone.Usuarios AS usuarios
		INNER JOIN SpotifyClone.Historico_Reproducao AS historico
			ON usuarios.id = historico.id_usuario
		INNER JOIN SpotifyClone.Musicas AS musicas
			ON musicas.id = historico.id_musica
		GROUP BY usuario
        ORDER BY usuario;