import varkQuestion from '../../types/component_schemas/varkQuestion';

const varkCuestionnaireList: varkQuestion[] = [
  {
    // Question # 1
    question_prompt:
      'Necesito encontrar el camino a una tienda que me recomendó un amigo. Yo preferiría:',
    question_alternatives: [
      {
        alternative_prompt:
          'Encontrar la tienda a partir de un punto de referencia conocido.',
        learning_style: 'kinesthetic',
      },
      {
        alternative_prompt: 'Pedirle a mi amigo que me diga cómo llegar.',
        learning_style: 'aural',
      },
      {
        alternative_prompt:
          'Anotar los nombres de las calles que debo recorrer para llegar.',
        learning_style: 'textual',
      },
      {
        alternative_prompt: 'Usar un mapa.',
        learning_style: 'visual',
      },
    ],
  },
  {
    // Question # 2
    question_prompt:
      'Un sitio web tiene un vídeo mostrando como hacer un tipo muy particular de gráfico. Hay una persona explicando en el vídeo y también se muestra un listado de pasos de qué hacer (acompañados de diagramas). Yo aprendería más:',
    question_alternatives: [
      {
        alternative_prompt: 'Viendo los diagramas.',
        learning_style: 'visual',
      },
      {
        alternative_prompt: 'Escuchando a quien explica.',
        learning_style: 'aural',
      },
      {
        alternative_prompt: 'Leyendo las instrucciones.',
        learning_style: 'textual',
      },
      {
        alternative_prompt:
          'Viendo las acciones necesarias para hacer el gráfico.',
        learning_style: 'kinesthetic',
      },
    ],
  },
  {
    // Question # 3
    question_prompt:
      'Quiero saber más acerca de un viaje guiado que planeo hacer. Yo preferiría:',
    question_alternatives: [
      {
        alternative_prompt:
          'Ver los detalles acerca de las actividades destacadas del viaje guiado.',
        learning_style: 'kinesthetic',
      },
      {
        alternative_prompt: 'Usar un mapa para ver los lugares a visitar.',
        learning_style: 'visual',
      },
      {
        alternative_prompt:
          'Leer la descripción del viaje guiado en el itinerario.',
        learning_style: 'textual',
      },
      {
        alternative_prompt: 'Conversar con el planificador del tour.',
        learning_style: 'aural',
      },
    ],
  },
  {
    // Question # 4
    question_prompt:
      'Al escoger una carrera o área de estudio, las siguientes actividades me son de importancia:',
    question_alternatives: [
      {
        alternative_prompt:
          'Aplicar del conocimiento obtenido en situaciones reales.',
        learning_style: 'kinesthetic',
      },
      {
        alternative_prompt:
          'Debatir con otros acerca de los conocimientos adquiridos.',
        learning_style: 'aural',
      },
      {
        alternative_prompt:
          'Que el área de estudio me permita trabajar con diseños, mapas o gráficos.',
        learning_style: 'visual',
      },
      {
        alternative_prompt:
          'Que los conocimientos adquiridos sean fáciles de expresar en la palabra escrita.',
        learning_style: 'textual',
      },
    ],
  },
  {
    // Question # 5
    question_prompt: 'Cuando estoy estudiando, yo:',
    question_alternatives: [
      {
        alternative_prompt: 'Disfruto de conversar acerca de lo estudiado.',
        learning_style: 'aural',
      },
      {
        alternative_prompt: 'Busco patrones entre los contenidos.',
        learning_style: 'visual',
      },
      {
        alternative_prompt: 'Uso ejemplos o aplicaciones reales del contenido.',
        learning_style: 'kinesthetic',
      },
      {
        alternative_prompt:
          'Busco libros y artículos relacionados al contenido.',
        learning_style: 'textual',
      },
    ],
  },
  {
    // Question # 6
    question_prompt:
      'Estoy buscando ahorrar algo de dinero y tengo varias opciones de ahorro. Para tomar una decisión preferiría:',
    question_alternatives: [
      {
        alternative_prompt:
          'Considerar como cada alternativa se aplicaría a mi caso específico.',
        learning_style: 'kinesthetic',
      },
      {
        alternative_prompt:
          'Leer un tríptico impreso que describa cada opción de ahorro.',
        learning_style: 'textual',
      },
      {
        alternative_prompt:
          'Visualizar gráficos del rendimiento esperado de cada opción.',
        learning_style: 'visual',
      },
      {
        alternative_prompt: 'Hablar con un experto acerca de cada opción.',
        learning_style: 'aural',
      },
    ],
  },
  {
    // Question # 7
    question_prompt:
      'Quiero aprender a jugar un nuevo juego de mesa. Yo quisiera:',
    question_alternatives: [
      {
        alternative_prompt: 'Ver a otros jugando antes.',
        learning_style: 'kinesthetic',
      },
      {
        alternative_prompt: 'Escuchar a alguien explicando el juego.',
        learning_style: 'aural',
      },
      {
        alternative_prompt: 'Ver diagramas que expliquen las reglas del juego.',
        learning_style: 'visual',
      },
      {
        alternative_prompt: 'Leer el manual.',
        learning_style: 'textual',
      },
    ],
  },
  {
    // Question # 8
    question_prompt: 'Tengo un problema cardíaco. Yo quisiera que el doctor:',
    question_alternatives: [
      {
        alternative_prompt:
          'Me entregase un documento explicativo de mi enfermedad.',
        learning_style: 'textual',
      },
      {
        alternative_prompt:
          'Usase una figura de plástico para explicarme la enfermedad.',
        learning_style: 'kinesthetic',
      },
      {
        alternative_prompt:
          'Me describiese en sus propias palabras lo que está mal.',
        learning_style: 'aural',
      },
      {
        alternative_prompt: 'Me mostrase un diagrama de lo que está mal.',
        learning_style: 'visual',
      },
    ],
  },
  {
    // Question # 9
    question_prompt:
      'Quiero aprender a usar un programa nuevo en la computadora. Yo:',
    question_alternatives: [
      {
        alternative_prompt: 'Leería las instrucciones del programa.',
        learning_style: 'textual',
      },
      {
        alternative_prompt:
          'Le pediría una explicación a alguien que sepa usar el programa.',
        learning_style: 'aural',
      },
      {
        alternative_prompt: 'Aprendería a usarlo a partir de intento y error.',
        learning_style: 'kinesthetic',
      },
      {
        alternative_prompt: 'Seguiría las imagenes en un tutorial paso a paso.',
        learning_style: 'visual',
      },
    ],
  },
  {
    // Question # 10
    question_prompt:
      'Cuando estoy aprendiendo algo nuevo en el Internet, me gusta que hayan:',
    question_alternatives: [
      {
        alternative_prompt:
          'Vídeos mostrando como hacer lo que estoy aprendiendo.',
        learning_style: 'kinesthetic',
      },
      {
        alternative_prompt: 'Imagenes e ilustraciones vistosas.',
        learning_style: 'visual',
      },
      {
        alternative_prompt: 'Buenas descripciones y explicaciones escritas.',
        learning_style: 'textual',
      },
      {
        alternative_prompt:
          'Podcasts y entrevistas donde me hablen de lo que estoy aprendiendo.',
        learning_style: 'aural',
      },
    ],
  },
  {
    // Question # 11
    question_prompt:
      'Necesito información de un nuevo proyecto donde voy a trabajar, pediría:',
    question_alternatives: [
      {
        alternative_prompt:
          'Diagramas que mostrasen las distintas etapas del proyecto.',
        learning_style: 'visual',
      },
      {
        alternative_prompt:
          'Un reporte escrito de los principales detalles del proyecto.',
        learning_style: 'textual',
      },
      {
        alternative_prompt:
          'Una reunión para discutir los detalles del proyecto.',
        learning_style: 'aural',
      },
      {
        alternative_prompt: 'Antecedentes de proyectos similares exitosos.',
        learning_style: 'kinesthetic',
      },
    ],
  },
  {
    // Question # 12
    question_prompt:
      'Quiero aprender a tomar mejores fotografías con una cámara profesional. Yo:',
    question_alternatives: [
      {
        alternative_prompt:
          'Preguntaría a expertos acerca de la cámara y sus funcionalidades.',
        learning_style: 'aural',
      },
      {
        alternative_prompt: 'Leería el manual de la cámara.',
        learning_style: 'textual',
      },
      {
        alternative_prompt:
          'Buscaría diagramas de la camara que resalten que hace cada botón.',
        learning_style: 'visual',
      },
      {
        alternative_prompt:
          'Tomaría fotos con distintas configuraciones para ver cómo quedan mejor.',
        learning_style: 'kinesthetic',
      },
    ],
  },
  {
    // Question # 13
    question_prompt: 'Yo prefiero un profesor que hace:',
    question_alternatives: [
      {
        alternative_prompt: 'Ejemplos prácticos de los contenidos.',
        learning_style: 'kinesthetic',
      },
      {
        alternative_prompt:
          'Sesiones de preguntas y respuestas así como charlas con invitados.',
        learning_style: 'aural',
      },
      {
        alternative_prompt: 'Lecturas durante el horario de clase.',
        learning_style: 'textual',
      },
      {
        alternative_prompt: 'Bastantes diagramas, gráficos e imágenes.',
        learning_style: 'visual',
      },
    ],
  },
  {
    // Question # 14
    question_prompt:
      'He terminado un examen y quisiera tener algo de retroalimentación, preferiría que el formato de la retroalimentación incluyese:',
    question_alternatives: [
      {
        alternative_prompt: 'Ejemplos de lo que estuve haciendo.',
        learning_style: 'kinesthetic',
      },
      {
        alternative_prompt: 'Una explicación escrita de mis resultados.',
        learning_style: 'textual',
      },
      {
        alternative_prompt:
          'Una charla con un instructor que me diese consejos.',
        learning_style: 'aural',
      },
      {
        alternative_prompt: 'Gráficos y diagramas de lo que logré.',
        learning_style: 'visual',
      },
    ],
  },
  {
    // Question # 15
    question_prompt:
      'Quiero saber más de una propiedad que me interesa comprar, Yo quisiera tener:',
    question_alternatives: [
      {
        alternative_prompt: 'Un video mostrando la propiedad.',
        learning_style: 'kinesthetic',
      },
      {
        alternative_prompt: 'Una conversación con el dueño.',
        learning_style: 'aural',
      },
      {
        alternative_prompt:
          'Una descripción por escrito detallada de las habitaciones.',
        learning_style: 'textual',
      },
      {
        alternative_prompt: 'Un plano mostrándome un mapa del área.',
        learning_style: 'visual',
      },
    ],
  },
  {
    // Question # 16
    question_prompt:
      'Quiero ensamblar una mesa de madera que vino por partes. Para mi la mejor manera de aprender sería:',
    question_alternatives: [
      {
        alternative_prompt:
          'A partir de diagramas que muestren el ensamblado de la mesa.',
        learning_style: 'visual',
      },
      {
        alternative_prompt:
          'Con consejos de alguien que ya ha hecho algo similar antes.',
        learning_style: 'aural',
      },
      {
        alternative_prompt:
          'Con instrucciones por escrito de cómo armar la mesa.',
        learning_style: 'textual',
      },
      {
        alternative_prompt:
          'Viendo un vídeo de alguien ensamblando una mesa similar.',
        learning_style: 'kinesthetic',
      },
    ],
  },
];

export default varkCuestionnaireList;
