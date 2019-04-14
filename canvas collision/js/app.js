const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth - 30;
canvas.height = window.innerHeight - 30;

const c = canvas.getContext('2d');


var colors = [
	'#832C65',
	'#A43741',
	'#408E2F',
	'#81A035'
];


addEventListener("resize", function () {
    canvas.width = innerWidth - 30;
    canvas.height = innerHeight - 30;
});


function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = {
            x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2),
            y: u1.y
        };
        const v2 = {
            x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2),
            y: u2.y
        };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

let mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

function getDistance(x1, y1, x2, y2) {
    let xDist = x2 - x1;
    let yDist = y2 - y1;
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.velocity = {
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 5
    }
    this.radius = radius;
    this.color = color;
    this.mass = 1;

    this.update = particles => {
        this.draw();

        for (let i = 0; i < particles.length; i++) {
            if (this === particles[i]) continue;
            if (getDistance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0) {
                resolveCollision(this, particles[i])
            }
        }

        if (this.x - this.radius <= 0 || this.x + this.radius > canvas.width) {
            this.velocity.x = -this.velocity.x;
        } else if (this.y - this.radius <= 0 || this.y + this.radius > canvas.height) {
            this.velocity.y = -this.velocity.y;
        }
        for (let i = 0; i < particles.length; i++) {
            let aBakteria = particles[1].color = '#832C65';
            let bBakteria = particles[2].color = '#FFF943';
            let cBakteria = particles[3].color = '#FF4343';
            let dBakteria = particles[4].color = '#2DABAB';



            if (getDistance(particles[1].x, particles[1].y, particles[i].x, particles[i].y) - this.radius * 2 < 0) {
                particles[i].color = '#832C65';
            }
            if (getDistance(particles[2].x, particles[2].y, particles[i].x, particles[i].y) - this.radius * 2 < 0) {
                particles[i].color = '#FFF943';

            }
            if (getDistance(particles[3].x, particles[3].y, particles[i].x, particles[i].y) - this.radius * 2 < 0) {
                particles[i].color = '#FF4343';

            }
            if (getDistance(particles[4].x, particles[4].y, particles[i].x, particles[i].y) - this.radius * 2 < 0) {
                particles[i].color = '#2DABAB';
            }


//            function whoWillWin() {
//                if (particles[i].color = '#832C65') {
//                    console.log('lol')
//                } else if(particles[i].color = '#FFF943'){
//                    
//                }else if(particles[i].color = '#FF4343'){
//                    
//                }else if(particles[i].color = '#2DABAB'){
//                    
//                }
//            }
//            particles.every(whoWillWin)


        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }


}
let particles;

function init() {
    particles = [];

    for (let i = 0; i < 120; i++) {
        const radius = 15;
        let x = randomIntFromRange(radius, canvas.width - radius);
        let y = randomIntFromRange(radius, canvas.height - radius);
        let color = 'green';
        //            randomColor(colors);

        if (i !== 0) {
            for (let j = 0; j < particles.length; j++) {
                if (getDistance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0) {
                    x = randomIntFromRange(radius, canvas.width - radius);
                    y = randomIntFromRange(radius, canvas.height - radius)
                    j = -1;
                }
            }
        }
        particles.push(new Particle(x, y, radius, color))

    }
}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(Particle => {
        Particle.update(particles);
    })


}

init();
animate();
