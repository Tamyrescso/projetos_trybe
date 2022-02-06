SELECT
	usuarios.usuario AS usuario,
	IF(MAX(historico.data_reproducao) LIKE '2021%', 'Usuário ativo', 'Usuário inativo') AS condicao_usuario
		FROM SpotifyClone.Usuarios AS usuarios
		INNER JOIN SpotifyClone.Historico_Reproducao AS historico
			ON usuarios.id = historico.id_usuario
		GROUP BY usuario
        ORDER BY usuario;