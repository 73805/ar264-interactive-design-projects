'''

This script facilitates the insertion of new effects by updating
every data-X value by any integer.

If X = 1000 in the first data-X, and the desired update is 100,
then every data-X will be increased by 100. The new first
data-X will be 1100.

'''
# lit
docPart = '''
<div class="block inventor-container bg-color" 
	data-0="display:none;" 
	data-5000="display:block;" 
	data-10550="display:none;">
		<div class="ribbon fg"
		data-3199="z-index:0;" 
		data-3200="z-index:5;">
			<img src="assets/ribbon_fg.png">
			<div class="revealer bg-color" 
			data-2600="max-width:100%;left:0;opacity:1;" 
			data-3200="max-width:0%;left:0;opacity:1;"
			data-3201="opacity:0;left:100%;"
			data-3250="opacity:0;max-width:100%; left:100%;"
			data-9950="left:100%;opacity:1;"
			data-10550="left:0;">
			</div>
			<img 
			data-2000="opacity:0;"
			data-3400="opacity:0;"
			data-3800="opacity:1;"
			data-5300="opacity:0;"
			src="assets/julius.png">
			<img 
			data-2000="opacity:0;"
			data-5400="opacity:0;"
			data-5800="opacity:1;"
			data-7300="opacity:0;"
			src="assets/william.png">

			<img 
			data-2000="opacity:0;"
			data-7400="opacity:0;"
			data-7800="opacity:1;"
			data-9300="opacity:0;"
			src="assets/allen.png">
		</div>
		<div class="ribbon">
			<img src="assets/ribbon_bg.png">
			<div class="revealer bg-color" 
			data-2000="max-width:100%;right:0;opacity:1;" 
			data-2600="max-width:0%;right:0;opacity:1;"
			data-2601="opacity:0;"
			data-2650="opacity:0; max-width:100%; right:100%;"
			data-9350="right:100%;opacity:1;"
			data-9950="right:0;"></div>
		</div>
		<div class="inventor" 
		data-3200="bottom:-74vh;" 
		data-3800="bottom:13vh;"
		data-4500="bottom:13vh;"
		data-5300="bottom:100vh;">
			<img src="assets/julius_portrait.png">
		</div>
		<div class="bio text"
		data-3600="left:-25vw;top:50%;"
		data-4000="left:10vw;"
		data-4500="top:50%;"
		data-5300="top:120vh;">
			<h2>1859</h2>
			<p>A German physicist theorized the existence of cathode rays.</p>
		</div>


		<div class="inventor" 
		data-5200="bottom:-74vh;" 
		data-5800="bottom:13vh;"
		data-6500="bottom:13vh;"
		data-7300="bottom:100vh;">
			<img src="assets/william_portrait.png">
		</div>
		<div class="bio text"
		data-5600="left:-25vw;top:50%;"
		data-6000="left:10vw;"
		data-6500="top:50%;"
		data-7300="top:120vh;">
			<h2>1878</h2>
			<p>William confirmed the existence of cathode rays by making them visible through what is now called a Cathode Ray Tube.</p>
		</div>

		<div class="inventor" 
		data-7200="bottom:-74vh;" 
		data-7800="bottom:13vh;"
		data-8500="bottom:13vh;"
		data-9300="bottom:100vh;">
			<img src="assets/allen_portrait.png">
		</div>
		<div class="bio text"
		data-7600="left:-25vw;top:50%;"
		data-8000="left:10vw;"
		data-8500="top:50%;"
		data-9300="top:120vh;">
			<h2>1931</h2>
			<p>This young businessman made the first commercial CRT Television.</p>
		</div>


	</div>

	<!-- CRT Fall in to art Exhibit  -->

	<div class="block crt-today bg-color"
	data-0="display:none;" 
	data-10550="display:block;"
	data-16300="display:none;">
		<div 
		data-15000="width:160vh;height:160vh;transform: translate(0%, 0%);right:-7%;"
		data-16000="width:500vh;height:500vh;transform: translate(73%, 20%);right:0%;"
		class="tv-fallbox">
			<div class="row bottom">
				<div
				data-10550="bottom:100vh;"
				data-10850="bottom:0vh;"
				class="tv tv1">
					<div class="tv-inner">
						<img 
						data-10550="display:block;" 
						src="assets/power_seven.png">						
						<img 
						data-10550="display:none;"
						data-13500="display:block;" 
						src="assets/power_six.png">						
						<img 
						data-10550="display:none;"
						data-13600="display:block;" 
						src="assets/power_five.png">						
						<img 
						data-10550="display:none;"
						data-13700="display:block;" 
						src="assets/power_four.png">						
						<img 
						data-10550="display:none;"
						data-13800="display:block;" 
						src="assets/power_three.png">						
						<img 
						data-10550="display:none;"
						data-13900="display:block;" 
						src="assets/power_two.png">						
						<img 
						data-10550="display:none;"
						data-14000="display:block;" 
						src="assets/power_one.png">						
						<img 
						data-10550="display:none;"
						data-14100="display:block;" 
						src="assets/crt_square_snowcrash.gif">
						<img
						data-10550="display:none;"
						data-14200="display:block;"
						src="assets/crt_kanye.gif">
					</div>
				</div>
				<div
				data-10750="bottom:100vh;"
				data-11050="bottom:0vh;"
				class="tv tv2">
					<div class="tv-inner">
						<img 
						data-10550="display:block;" 
						src="assets/power_seven.png">						
						<img 
						data-10550="display:none;"
						data-13500="display:block;" 
						src="assets/power_six.png">						
						<img 
						data-10550="display:none;"
						data-13600="display:block;" 
						src="assets/power_five.png">						
						<img 
						data-10550="display:none;"
						data-13700="display:block;" 
						src="assets/power_four.png">						
						<img 
						data-10550="display:none;"
						data-13800="display:block;" 
						src="assets/power_three.png">						
						<img 
						data-10550="display:none;"
						data-13900="display:block;" 
						src="assets/power_two.png">						
						<img 
						data-10550="display:none;"
						data-14000="display:block;" 
						src="assets/power_one.png">						
						<img 
						data-10550="display:none;"
						data-14100="display:block;" 
						src="assets/crt_square_snowcrash.gif">
						<img
						data-10550="display:none;"
						data-14200="display:block;"
						src="assets/crt_kanye.gif">
					</div>
				</div>
				<div
				data-10950="bottom:100vh;"
				data-11250="bottom:0vh;"
				class="tv tv3">
					<div class="tv-inner">
						<img 
						data-10550="display:block;" 
						src="assets/power_seven.png">						
						<img 
						data-10550="display:none;"
						data-13500="display:block;" 
						src="assets/power_six.png">						
						<img 
						data-10550="display:none;"
						data-13600="display:block;" 
						src="assets/power_five.png">						
						<img 
						data-10550="display:none;"
						data-13700="display:block;" 
						src="assets/power_four.png">						
						<img 
						data-10550="display:none;"
						data-13800="display:block;" 
						src="assets/power_three.png">						
						<img 
						data-10550="display:none;"
						data-13900="display:block;" 
						src="assets/power_two.png">						
						<img 
						data-10550="display:none;"
						data-14000="display:block;" 
						src="assets/power_one.png">						
						<img 
						data-10550="display:none;"
						data-14100="display:block;" 
						src="assets/crt_square_snowcrash.gif">
						<img
						data-10550="display:none;"
						data-14200="display:block;"
						src="assets/crt_kanye.gif">
					</div>
				</div>
				<div
				data-11150="bottom:100vh;"
				data-11450="bottom:0vh;"
				class="tv tv4">
					<div class="tv-inner">
						<img 
						data-10550="display:block;" 
						src="assets/power_seven.png">						
						<img 
						data-10550="display:none;"
						data-13500="display:block;" 
						src="assets/power_six.png">						
						<img 
						data-10550="display:none;"
						data-13600="display:block;" 
						src="assets/power_five.png">						
						<img 
						data-10550="display:none;"
						data-13700="display:block;" 
						src="assets/power_four.png">						
						<img 
						data-10550="display:none;"
						data-13800="display:block;" 
						src="assets/power_three.png">						
						<img 
						data-10550="display:none;"
						data-13900="display:block;" 
						src="assets/power_two.png">						
						<img 
						data-10550="display:none;"
						data-14000="display:block;" 
						src="assets/power_one.png">						
						<img 
						data-10550="display:none;"
						data-14100="display:block;" 
						src="assets/crt_square_snowcrash.gif">
						<img
						data-10550="display:none;"
						data-14200="display:block;"
						src="assets/crt_kanye.gif">
					</div>
				</div>
				<div
				data-11350="bottom:100vh;"
				data-11650="bottom:0vh;"
					class="tv tv5">
					<div class="tv-inner">
						<img 
						data-10550="display:block;" 
						src="assets/power_seven.png">						
						<img 
						data-10550="display:none;"
						data-13500="display:block;" 
						src="assets/power_six.png">						
						<img 
						data-10550="display:none;"
						data-13600="display:block;" 
						src="assets/power_five.png">						
						<img 
						data-10550="display:none;"
						data-13700="display:block;" 
						src="assets/power_four.png">						
						<img 
						data-10550="display:none;"
						data-13800="display:block;" 
						src="assets/power_three.png">						
						<img 
						data-10550="display:none;"
						data-13900="display:block;" 
						src="assets/power_two.png">						
						<img 
						data-10550="display:none;"
						data-14000="display:block;" 
						src="assets/power_one.png">						
						<img 
						data-10550="display:none;"
						data-14100="display:block;" 
						src="assets/crt_square_snowcrash.gif">
						<img
						data-10550="display:none;"
						data-14200="display:block;"
						src="assets/crt_kanye.gif">
					</div>
				</div>
			</div>

			<div class="row middle">
				<div
				data-11550="bottom:100vh;"
				data-11850="bottom:0vh;"
				class="tv tv6">
					<div class="tv-inner">
						<img 
						data-10550="display:block;" 
						src="assets/power_seven.png">						
						<img 
						data-10550="display:none;"
						data-13500="display:block;" 
						src="assets/power_six.png">						
						<img 
						data-10550="display:none;"
						data-13600="display:block;" 
						src="assets/power_five.png">						
						<img 
						data-10550="display:none;"
						data-13700="display:block;" 
						src="assets/power_four.png">						
						<img 
						data-10550="display:none;"
						data-13800="display:block;" 
						src="assets/power_three.png">						
						<img 
						data-10550="display:none;"
						data-13900="display:block;" 
						src="assets/power_two.png">						
						<img 
						data-10550="display:none;"
						data-14000="display:block;" 
						src="assets/power_one.png">						
						<img 
						data-10550="display:none;"
						data-14100="display:block;" 
						src="assets/crt_square_snowcrash.gif">
						<img
						data-10550="display:none;"
						data-14200="display:block;"
						src="assets/crt_kanye.gif">
					</div>
				</div>
				<div
				data-11750="bottom:100vh;"
				data-12050="bottom:0vh;"
				class="tv tv7">
					<div class="tv-inner">
						<img 
						data-10550="display:block;" 
						src="assets/power_seven.png">						
						<img 
						data-10550="display:none;"
						data-13500="display:block;" 
						src="assets/power_six.png">						
						<img 
						data-10550="display:none;"
						data-13600="display:block;" 
						src="assets/power_five.png">						
						<img 
						data-10550="display:none;"
						data-13700="display:block;" 
						src="assets/power_four.png">						
						<img 
						data-10550="display:none;"
						data-13800="display:block;" 
						src="assets/power_three.png">						
						<img 
						data-10550="display:none;"
						data-13900="display:block;" 
						src="assets/power_two.png">						
						<img 
						data-10550="display:none;"
						data-14000="display:block;" 
						src="assets/power_one.png">						
						<img 
						data-10550="display:none;"
						data-14100="display:block;" 
						src="assets/crt_square_snowcrash.gif">
						<img
						data-10550="display:none;"
						data-14200="display:block;"
						src="assets/crt_kanye.gif">
					</div>
				</div>
				<div
				data-12250="bottom:100vh;"
				data-12550="bottom:0vh;"
				class="tv tv8">
					<div class="tv-inner">
						<img 
						data-10550="display:block;" 
						src="assets/power_seven.png">						
						<img 
						data-10550="display:none;"
						data-13500="display:block;" 
						src="assets/power_six.png">						
						<img 
						data-10550="display:none;"
						data-13600="display:block;" 
						src="assets/power_five.png">						
						<img 
						data-10550="display:none;"
						data-13700="display:block;" 
						src="assets/power_four.png">						
						<img 
						data-10550="display:none;"
						data-13800="display:block;" 
						src="assets/power_three.png">						
						<img 
						data-10550="display:none;"
						data-13900="display:block;" 
						src="assets/power_two.png">						
						<img 
						data-10550="display:none;"
						data-14000="display:block;" 
						src="assets/power_one.png">						
						<img 
						data-10550="display:none;"
						data-14100="display:block;" 
						src="assets/crt_square_snowcrash.gif">
						<img
						data-10550="display:none;"
						data-14200="display:block;"
						src="assets/crt_kanye.gif">
					</div>
				</div>
				<div
				data-12450="bottom:100vh;"
				data-12750="bottom:0vh;"
					class="tv tv9">
					<div class="tv-inner">
						<img 
						data-10550="display:block;" 
						src="assets/power_seven.png">						
						<img 
						data-10550="display:none;"
						data-13500="display:block;" 
						src="assets/power_six.png">						
						<img 
						data-10550="display:none;"
						data-13600="display:block;" 
						src="assets/power_five.png">						
						<img 
						data-10550="display:none;"
						data-13700="display:block;" 
						src="assets/power_four.png">						
						<img 
						data-10550="display:none;"
						data-13800="display:block;" 
						src="assets/power_three.png">						
						<img 
						data-10550="display:none;"
						data-13900="display:block;" 
						src="assets/power_two.png">						
						<img 
						data-10550="display:none;"
						data-14000="display:block;" 
						src="assets/power_one.png">						
						<img 
						data-10550="display:none;"
						data-14100="display:block;" 
						src="assets/crt_square_snowcrash.gif">
						<img
						data-10550="display:none;"
						data-14200="display:block;"
						src="assets/crt_kanye.gif">
					</div>
				</div>
			</div>
			<div class="row top">
				<div 
				data-10750="opacity:0;"
				data-11850="opacity:0;"
				data-12050="opacity:1;"
				class="today-text text">
					<h2>
						Today, CRT's have largely been replaced by LCD TVs.<br>
						but there are a few contexts where they've stuck around.
					</h2>
				</div>
				<div
				data-12650="bottom:100vh;"
				data-12950="bottom:0vh;"
				class="tv tv10">
					<div class="tv-inner">
						<img 
						data-10550="display:block;" 
						src="assets/power_seven.png">						
						<img 
						data-10550="display:none;"
						data-13500="display:block;" 
						src="assets/power_six.png">						
						<img 
						data-10550="display:none;"
						data-13600="display:block;" 
						src="assets/power_five.png">						
						<img 
						data-10550="display:none;"
						data-13700="display:block;" 
						src="assets/power_four.png">						
						<img 
						data-10550="display:none;"
						data-13800="display:block;" 
						src="assets/power_three.png">						
						<img 
						data-10550="display:none;"
						data-13900="display:block;" 
						src="assets/power_two.png">						
						<img 
						data-10550="display:none;"
						data-14000="display:block;" 
						src="assets/power_one.png">						
						<img 
						data-10550="display:none;"
						data-14100="display:block;" 
						src="assets/crt_square_snowcrash.gif">
						<img
						data-10550="display:none;"
						data-14200="display:block;"
						src="assets/crt_kanye.gif">
					</div>
				</div>
				<div
				data-12850="bottom:100vh;"
				data-13150="bottom:0vh;"
				class="tv tv11">
					<div class="tv-inner">
						<img 
						data-10550="display:block;" 
						src="assets/power_seven.png">						
						<img 
						data-10550="display:none;"
						data-13500="display:block;" 
						src="assets/power_six.png">						
						<img 
						data-10550="display:none;"
						data-13600="display:block;" 
						src="assets/power_five.png">						
						<img 
						data-10550="display:none;"
						data-13700="display:block;" 
						src="assets/power_four.png">						
						<img 
						data-10550="display:none;"
						data-13800="display:block;" 
						src="assets/power_three.png">						
						<img 
						data-10550="display:none;"
						data-13900="display:block;" 
						src="assets/power_two.png">						
						<img 
						data-10550="display:none;"
						data-14000="display:block;" 
						src="assets/power_one.png">						
						<img 
						data-10550="display:none;"
						data-14100="display:block;" 
						src="assets/crt_square_snowcrash.gif">
						<img
						data-10550="display:none;"
						data-14200="display:block;"
						src="assets/crt_kanye.gif">
					</div>
				</div>
				<div
				data-13050="bottom:100vh;"
				data-13350="bottom:0vh;"
					class="tv tv12">
					<div class="tv-inner">
						<img 
						data-10550="display:block;" 
						src="assets/power_seven.png">						
						<img 
						data-10550="display:none;"
						data-13500="display:block;" 
						src="assets/power_six.png">						
						<img 
						data-10550="display:none;"
						data-13600="display:block;" 
						src="assets/power_five.png">						
						<img 
						data-10550="display:none;"
						data-13700="display:block;" 
						src="assets/power_four.png">						
						<img 
						data-10550="display:none;"
						data-13800="display:block;" 
						src="assets/power_three.png">						
						<img 
						data-10550="display:none;"
						data-13900="display:block;" 
						src="assets/power_two.png">						
						<img 
						data-10550="display:none;"
						data-14000="display:block;" 
						src="assets/power_one.png">						
						<img 
						data-10550="display:none;"
						data-14100="display:block;" 
						src="assets/crt_square_snowcrash.gif">
						<img
						data-10550="display:none;"
						data-14200="display:block;"
						src="assets/crt_kanye.gif">
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Zoom out to gamers -->

	<div class="block gaming bg-color"
	data-0="display:none;" 
	data-16300="display:block;">
		<div class="gaming-text text"
		data-16300="opacity:0;"
		data-18400="opacity:0;"
		data-18800="opacity:1;">
			<p>Hundreds of old-school video games</p>
			<p>(such as games in arcades)</p>
			<p>still need to be played on CRTs in order to function properly.</p>
		</div>
		<div class="tv main"
		data-17200="right:0%;transform:translateX(0%);height:100vh;width:100vh;bottom:0vh;"
		data-17500="right:50%;transform:translateX(50%);height:40vh;width:40vh;bottom:20vh;">
			<div class="tv-inner">
				<img 
				data-17100="display:block;" 
				src="assets/power_seven.png">						
				<img 
				data-17100="display:none;"
				data-17000="display:block;"
				data-17800="display:block;" 
				src="assets/power_six.png">						
				<img 
				data-17000="display:none;"
				data-16900="display:block;"
				data-17900="display:block;"  
				src="assets/power_five.png">						
				<img 
				data-16900="display:none;"
				data-16800="display:block;"
				data-18000="display:block;" 
				src="assets/power_four.png">						
				<img 
				data-16800="display:none;"
				data-16700="display:block;" 
				data-18100="display:block;" 
				src="assets/power_three.png">						
				<img 
				data-16700="display:none;"
				data-16600="display:block;"
				data-18200="display:block;" 
				src="assets/power_two.png">						
				<img 
				data-16600="display:none;"
				data-16500="display:block;" 
				data-18300="display:block;" 
				src="assets/power_one.png">						
				<img 
				data-16500="display:none;"
				data-16400="display:block;"
				data-18400="display:block;" 
				src="assets/crt_square_snowcrash.gif">
				<img
				data-16300="display:block;"
				data-16400="display:none;"
				src="assets/crt_kanye.gif">
				<img 
				data-16000="display:none;"
				data-18600="display:block;"
				src="assets/smashbros.png">
			</div>
		</div>
		<img 
		data-16300="bottom:-100vh;"
		data-17300="bottom:-100vh;"
		data-17700="bottom:0vh;"
		src="assets/gamers.png"
		class="gamers">
	</div>

'''


def dataXupdater(docPart, updateNum):
    smock = docPart.split('data-')
    for i in range(1, len(smock)):
        # get the X in each data-X
        subSplit = smock[i].split('=')
        curX = subSplit[0]
        # update the X by the update number
        if int(curX) == 0:
            newX = 0
        else:
            newX = int(curX) + updateNum
        # update and re-join the splits
        subSplit[0] = str(newX)
        smock[i] = '='.join(subSplit)
    newDocPart = 'data-'.join(smock)
    return newDocPart
    
newDocPart = dataXupdater(docPart, 1000)

# write the updated html to a txt file for copy pasta
text_file = open("output.txt", "w")
text_file.write(newDocPart)
text_file.close()
