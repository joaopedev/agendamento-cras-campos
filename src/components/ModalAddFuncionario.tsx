import React, { useState, ChangeEvent } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';

interface Employee {
  // Interface do funcionário (replique a mesma interface do componente principal)
  name: string;
  cpf: string;
  cras: string;
  active: boolean;
}

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newEmployee: Employee) => void; // Alterado para aceitar um Employee
}

const ModalAddFuncionario: React.FC<AddEmployeeModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [cras, setCras] = useState('');

  const handleAdd = () => {
    onAdd({ name, cpf, cras, active: true }); // Adicionado o campo 'active' e definido como true
    setName('');
    setCpf('');
    setCras('CODIN');
  };

  const handleCpfChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, ''); // Remove tudo que não for dígito
    value = value.slice(0, 11); // Limita a 11 caracteres

    if (value.length > 3) {
      value = `${value.slice(0, 3)}.${value.slice(3)}`;
    }
    if (value.length > 7) {
      value = `${value.slice(0, 7)}.${value.slice(7)}`;
    }
    if (value.length > 11) {
      value = `${value.slice(0, 11)}-${value.slice(11)}`;
    }

    setCpf(value);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar Funcionário</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder=''
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>CPF</FormLabel>
            <Input
              value={cpf}
              onChange={handleCpfChange} // Chama a função de formatação
              placeholder=''
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Senha</FormLabel>
            <Input
              value={senha}
              onChange={e => setSenha(e.target.value)}
              maxLength={8}
              placeholder=''
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>CRAS</FormLabel>
            <Select value={cras} onChange={e => setCras(e.target.value)}>
              {/* Opções de CRAS (substitua pelos valores corretos) */}
              <option value='CHATUBA'>CHATUBA</option>
              <option value='CODIN'>CODIN</option>
              <option value='CUSTODÓPOLIS'>CUSTODÓPOLIS</option>
              <option value='ESPLANADA'>ESPLANADA</option>
              <option value='FAROL'>FAROL</option>
              <option value='GOYTACAZES'>GOYTACAZES</option>
              <option value='JARDIM CARIOCA'>JARDIM CARIOCA</option>
              <option value='JOCKEY'>JOCKEY</option>
              <option value='MATADOURO'>MATADOURO</option>
              <option value='MORRO DO COCO'>MORRO DO COCO</option>
              <option value='PARQUE GUARUS'>PARQUE GUARUS</option>
              <option value='PENHA'>PENHA</option>
              <option value='TRAVESSÃO'>TRAVESSÃO</option>
              <option value='URURAÍ'>URURAÍ</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={handleAdd}>
            Adicionar
          </Button>
          <Button variant='ghost' onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalAddFuncionario;
