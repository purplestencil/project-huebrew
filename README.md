Project Huebrew is the final project for my graduate degree in computer science.

I am teaching myself JSON, JavaScript, HTML, CSS and how to work with a public API as part of this project. 
The end goal is to create a basic web application to control Phillips hue lights.

<body>
<div class="container">
	<h2>Overview</h2>
	<h3>Description</h3>
	<p>This project is being developed as a final project for COS-796, toward the completion of a master’s degree in Computer Science. The aim of this project is to demonstrate skills that have been learned over the course of this degree as well as to demonstrate
		a capacity for independent learning and technologies not covered in the course curriculum. I will be teaching myself JSON and JavaScript, and using the publicly available Phillips hue API to create a web application that can perform a basic light control
		function for a Phillips hue light. I will also be using tools and techniques that have been taught in Software Engineering (source control) and Management Information Technology (project management) to work on and manage this project.
	</p>
	<h3>Project Goals</h3>
	<p>This project will allow me to learn and demonstrate the following skills:</p>
	<ul>
		<li>Write the project scope (requirements document) before the start of project work</li>
		<li>Use Git for source control and repo management</li>
		<li>Learn JSON syntax and data types</li>
		<li>Learn to write JSON data (simple and complex) on my own</li>
		<li>Learn how to use JSON with JavaScript and HTML</li>
		<li>Learn to collect the required piece of information even from complex JSON data</li>
		<li>Learn how to contact an API and collect JSON response</li>
		<li>Develop a basic web application making use of a publicly available API (Phillips hue API)</li>
	</ul>
	<h3>High-Level Requirements</h3> 
	<p>This application will provide a web interface to perform the basic light control functions that are currently available in the native Phillips mobile apps. </p>
	<p>The application will use HTML, CSS and JavaScript to create the web UI. The application will provide the following hue controls:</p>
	<ul>
		<li>Connect to a Phillips hue bridge</li>
		<li>Add a hue light to the application</li>
		<li>Turn a light on and off</li>
	</ul>
	<h3>Deliverables</h3>
	<ul>
		<li>Web application</li>
		<li>Source code</li>
		<li>Project documentation</li>
	</ul>
	<h3>Tools Used</h3>
	<ul>
		<li>Git (source code is hosted on <a href="https://github.com/purplestencil/project-huebrew">GitHub</a>)
		</li>
		<li>Notepad++
		</li>
		<li><a href="https://developers.meethue.com/philips-hue-api">Phillips hue API</a>
		</li>
		<li><a href="http://steveyo.github.io/Hue-Emulator/">Phillips hue emulator</a>
		</li>
		<li>Phillips hue system (light and wireless bridge)
		</li>
	</ul>
	<h3>Implementation Plan</h3>
	<table class="table">
		<tr>
			<th>Phase</th>
			<th>Items</th>
		</tr>
		<tr>
			<td>Phase 1</td>
			<td>
				<ul>
					<li>Create HTML page for user to connect to a Hue bridge.</li>
					<li>Allow connections to a bridge.</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>Phase 2</td>
			<td>
				<ul>
					<li>Discover lights on the network.</li>
					<li>Connect to a light from the webpage.</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>Phase 3</td>
			<td>
				<ul>
					<li>Use the webpage control to toggle the light status.</li>
					<li>Improve user experience.</li>
				</ul>
			</td>
		</tr>
	</table>
	<h2>Document Revision History</h2>
	<table class="table">
		<tr>
			<th>Version</th>
			<th>Date</th>
			<th>Revision notes</th>
		</tr>
		<tr>
			<td>0.1</td>
			<td>January 8, 2017</td>
			<td>Created initial draft.</td>
		</tr>
		<tr>
			<td>0.2</td>
			<td>January 19, 2017</td>
			<td>Trimmed scope. PHP is no longer included in the learning scope. App must perform basic light control functions.</td>
		</tr>
		<tr>
			<td>0.3</td>
			<td>January 28, 2017</td>
			<td>Added project documentation page on GitHub Pages.</td>
		</tr>
	</table>
</div>
</body>
