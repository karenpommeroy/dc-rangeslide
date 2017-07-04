module.exports = function(grunt) {    
    
    this.uglifyOptions = {
		dead_code: true,
		conditionals: true,
		evaluate: true,
		unused: true,
		join_vars: true,
		drop_console: true,
		drop_debugger: true,
		comparisons: true,
		booleans: true,
		loops: true,
		if_return: true
	};
	
	grunt.initConfig({
        cssmin: {
			dist: {
				files: {
					"dist/dc-rangeslide.min.css": [
						"dist/dc-rangeslide.css"
					]
				}
			}
		},
		concat: {
			js: {
				src: [
                    "node_modules/rangeslide.js/dist/rangeslide.js",
					"src/main.js"
				],
				dest: "dist/dc-rangeslide.js"
			},
            css: {
				src: [
                    "node_modules/rangeslide.js/dist/rangeslide.css",
					"src/main.css"
				],
				dest: "dist/dc-rangeslide.css"
			}
		},
		umd: {
            dist: {
                options: {
                    src: "dist/dc-rangeslide.js",
                    dest: "dist/dc-rangeslide.js",
                    deps: {
                        "default": [
                            { "dc": "dc" }
                        ],
						global: ["dc"]
                    }
                }
            }
        },
        uglify: {
            dist: {
                files: [{
                    "dist/dc-rangeslide.min.js": ["dist/dc-rangeslide.js"]
                }],
                compress: this.uglifyOptions
            }
        },
        
        _clean: {
            build: {
                src: ["dist/"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-umd");
    grunt.renameTask("clean", "_clean");

    var cleanTask = ["_clean"];
    var buildTask = ["_clean", "concat", "cssmin", "umd", "uglify"];
    
    grunt.registerTask("default", buildTask);
    grunt.registerTask("clean", cleanTask);
    grunt.registerTask("build", buildTask);
};