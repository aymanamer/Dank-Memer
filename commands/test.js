exports.run = async function (Memer, msg, args) {
	if (args.length < 1) {
		Memer.r.table('test').insert([{
			name: msg.author.username,
			id: msg.author.id,
		}]).run(Memer.connection, function (err, result) {
			if (err) throw err;
			console.log(JSON.stringify(result, null, 2));
		})
	} else if (args[0] === '-stats') {
		Memer.r.table('test').run(Memer.connection, function (err, cursor) {
			if (err) throw err
			cursor.toArray(function (err, result) {
				if (err) throw err
				console.log(JSON.stringify(result, null, 2))
			})
		})
	}
}