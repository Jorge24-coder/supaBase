from pypdf import PdfReader
from langchain_text_splitters import RecursiveCharacterTextSplitter

# Cargar el archivo PDF
reader = PdfReader("HTM240_Documentacion_Completa_Alumnos.pdf")

# Obtener el número total de páginas
# print(f"Total de páginas: {len(reader.pages)}")

# Extraer el texto de la primera página
texto = reader.pages[2].extract_text()
print(texto)
