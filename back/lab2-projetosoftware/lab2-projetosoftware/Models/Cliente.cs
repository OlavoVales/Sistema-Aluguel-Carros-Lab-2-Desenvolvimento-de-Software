using System.ComponentModel.DataAnnotations;

namespace lab2_projetosoftware.Models
{
    public class Cliente
    {
        public int Id { get; set; }

        [Required]
        public string Nome { get; set; }

        [Required]
        [StringLength(11)]
        public string CPF { get; set; }

        [Required]
        public string RG { get; set; }

        public string Endereco { get; set; }
        public string Profissao { get; set; }

        // até 3 rendimentos (exemplo simplificado como texto)
        public string Rendimentos { get; set; }
    }
}
