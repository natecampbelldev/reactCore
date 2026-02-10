const setting = useThree((st) => st.set);
const [positioning, setPositioning] = useState({ x: 5, y: 10, z: 20 });
const [focalPoint, setFocalPoint] = useState({ x: 0, y: 0, z: 0 });

const mainCam = new THREE.PerspectiveCamera(100, 2, 0.1, 1000);
mainCam.position.x = positioning.x;
mainCam.position.y = positioning.y;
mainCam.position.z = positioning.z;
mainCam.lookAt(focalPoint.x, focalPoint.y, focalPoint.z);

setting({
  shadows: true,
  camera: mainCam,
});

const moveCamera = (position, focalPoint) => {
  setPositioning(position)
  setFocalPoint(focalPoint)
};

const intoBoiler = (e) => {
  if(e.distance > 0){
    e.stopPropagation()
    moveCamera({ x: 2, y: 7, z: 9 }, { x: 0, y: 0, z: 0 })
  }
};

const goBack = () =>{
  moveCamera({ x: 5, y: 10, z: 20 }, { x: 0, y: 0, z: 0 })
}
